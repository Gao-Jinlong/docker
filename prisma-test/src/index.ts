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
  await prisma.user.create({
    data: {
      name: 'ginlon',
      email: '111@gmail.com',
    },
  });

  await prisma.user.create({
    data: {
      name: 'ginlon2',
      email: '222@gmail.com',
    },
  });

  const users = await prisma.user.findMany();
  console.log(users);
}

// main();

async function main2() {
  const user = await prisma.user.create({
    data: {
      name: 'ginlon3',
      email: '3333@gmail.com',
      posts: {
        create: [
          {
            title: 'aaa',
            content: 'aaa',
          },
          {
            title: 'bbb',
            content: 'bbb',
          },
        ],
      },
    },
  });

  console.log(user);
}

// main2();

async function main3() {
  await prisma.post.update({
    where: {
      id: 2,
    },
    data: {
      content: 'new content',
    },
  });
}

// main3();

async function main4() {
  await prisma.post.delete({
    where: {
      id: 2,
    },
  });
}

main4();
