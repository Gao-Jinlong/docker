import * as amqp from 'amqplib';

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertQueue('aaa');

let i = 1;
setInterval(() => {
  channel.sendToQueue('aaa', Buffer.from(`hello ${i++}`));
  console.log('发送消息：', i);
}, 500);
