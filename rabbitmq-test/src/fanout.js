import * as amqp from 'amqplib';

const connect = await amqp.connect('amqp://localhost:5672');
const channel = await connect.createChannel();

// 创建一个 fanout 类型的交换机，fanout 类型的交换机会将消息发送到所有绑定到该交换机的队列中
await channel.assertExchange('test-exchange3', 'fanout');

channel.publish('test-exchange3', '', Buffer.from('hello1'));
channel.publish('test-exchange3', '', Buffer.from('hello2'));
channel.publish('test-exchange3', '', Buffer.from('hello3'));
