import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
});

(async function main() {
  await client.connect();

  client.on('error', (err) => console.log('Redis Client Error', err));

  const value = await client.keys('*');

  console.log(value);

  await createHash();

  await client.disconnect();
})();

async function createHash() {
  await client.hSet('userEntity', {
    name: 'John',
    age: 30,
    city: 'New York',
  });

  const value = await client.hGetAll('userEntity');
  console.log(value);
}
