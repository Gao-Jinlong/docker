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
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@mail.com',
      Post: {
        create: [
          {
            title: 'Post 1',
            content: 'Content 1',
          },
          {
            title: 'Post 2',
            content: 'Content 2',
          },
        ],
      },
    },
  });

  console.log(user);
}

main();
