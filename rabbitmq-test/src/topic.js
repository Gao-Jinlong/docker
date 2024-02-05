import * as amqp from 'amqplib';

const connect = await amqp.connect('amqp://localhost:5672');
const channel = await connect.createChannel();

// 创建一个 topic 类型的交换机，topic 类型的交换机会根据路由键将消息发送到对应的队列中
await channel.assertExchange('test-exchange2', 'topic');

channel.publish('test-exchange2', 'aaa.1', Buffer.from('hello1'));
channel.publish('test-exchange2', 'aaa.2', Buffer.from('hello2'));
channel.publish('test-exchange2', 'bbb.1', Buffer.from('hello3'));
