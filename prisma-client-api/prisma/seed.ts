import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
  ],
});

async function main() {
  await prisma.aaa.createMany({
    data: [
      {
        name: 'aaa',
        email: 'aaa@aaa.com',
      },
      {
        name: 'bbb',
        email: 'bbb@bbb.com',
      },
      {
        name: 'ccc',
        email: 'ccc@ccc.com',
      },
      {
        name: 'ddd',
        email: 'ddd@xx.com',
      },
      {
        name: 'eee',
        email: 'eee@xx.com',
      },
    ],
  });
}
main();
