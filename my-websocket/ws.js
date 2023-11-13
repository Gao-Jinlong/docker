const { EventEmitter } = require('events');
const http = require('http');
const crypto = require('crypto');

function hashKey(key) {
  const sha1 = crypto.createHash('sha1');
  sha1.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
  return sha1.digest('base64');
}

function handleMask(maskBytes, data) {
  const payload = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) {
    payload[i] = maskBytes[i % 4] ^ data[i];
  }
  return payload;
}

function encodeMessage(opcode, payload) {
  let bufferData = Buffer.alloc(payload.length + 2 + 0);

  let byte1 = parseInt('10000000', 2) | opcode; // 设置 FIN 位
  let byte2 = payload.length;

  bufferData.writeUInt8(byte1, 0);
  bufferData.writeUInt8(byte2, 1);

  payload.copy(bufferData, 2);

  return bufferData;
}

const OPCODES = {
  CONTINUATION: 0x0,
  TEXT: 0x1, // 文本
  BINARY: 0x2, // 二进制
  CLOSE: 0x8,
  PING: 0x9,
  PONG: 0xa,
};

class MyWebSocket extends EventEmitter {
  constructor(options) {
    super(options);

    const server = http.createServer();
    server.listen(options.port || 8080);

    server.on('upgrade', (req, socket) => {
      this.socket = socket;
      socket.setKeepAlive(true);

      const resHeaders = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + hashKey(req.headers['sec-websocket-key']),
        '',
        '',
      ].join('\r\n');
      socket.write(resHeaders);

      socket.on('data', (data) => {
        console.log('socket', data);
        this.processData(data);
      });
      socket.on('close', (error) => {
        this.emit('close');
      });
    });
  }
  processData(bufferData) {
    const byte1 = bufferData.readUInt8(0);
    let opcode = byte1 & 0x0f;

    const byte2 = bufferData.readUInt8(1);
    const str2 = byte2.toString(2);
    const MASK = str2[0];

    let curByteIndex = 2;

    let payloadLength = parseInt(str2.substring(1), 2);
    if (payloadLength === 126) {
      payloadLength = bufferData.readUInt16BE(2);
      curByteIndex += 2;
    } else if (payloadLength === 127) {
      payloadLength = bufferData.readUInt64BE(2);
      curByteIndex += 8;
    }

    let realData = bufferData.slice(curByteIndex, curByteIndex + payloadLength);
    if (MASK) {
      const maskKey = bufferData.slice(curByteIndex, curByteIndex + 4);
      curByteIndex += 4;
      const payloadData = bufferData.slice(
        curByteIndex,
        curByteIndex + payloadLength,
      );
      realData = handleMask(maskKey, payloadData);
    }

    return this.handleRealData(opcode, realData);
  }
  handleRealData(opcode, realDataBuffer) {
    switch (opcode) {
      case OPCODES.TEXT:
        this.emit('data', realDataBuffer.toString('utf8'));
        break;
      case OPCODES.BINARY:
        this.emit('data', realDataBuffer);
        break;
      default:
        this.emit('close');
        break;
    }
  }

  send(data) {
    let opcode;
    let buffer;
    if (Buffer.isBuffer(data)) {
      opcode = OPCODES.BINARY;
      buffer = data;
    } else if (typeof data === 'string') {
      opcode = OPCODES.TEXT;
      buffer = Buffer.from(data);
    } else {
      console.error('data type error');
    }

    this.doSend(opcode, buffer);
  }
  doSend(opcode, bufferDataBUffer) {
    this.socket.write(encodeMessage(opcode, bufferDataBUffer));
  }
}

module.exports = MyWebSocket;
