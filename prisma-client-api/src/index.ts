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
  await findTest();
  await updateTest();
}
main();

async function findTest() {
  const aaa = await prisma.aaa.findUnique({
    where: {
      id: 1,
    },
  });

  console.log(aaa);

  const bbb = await prisma.aaa.findUnique({
    where: {
      email: 'bbb@bbb.com',
    },
    select: {
      id: true,
      email: true,
    },
  });
  console.log(bbb);

  // const wellThrowError = await prisma.aaa.findUniqueOrThrow({
  //   where: {
  //     id: 100,
  //   },
  // });
  // console.log(wellThrowError);

  const res = await prisma.aaa.findMany({
    where: {
      email: {
        contains: '@',
      },
    },
    orderBy: {
      name: 'desc',
    },
    skip: 2,
    take: 3,
  });
  console.log('res', res);

  const theFirst = await prisma.aaa.findFirst({
    where: {
      email: {
        contains: '',
        endsWith: '',
        equals: '',
        gt: '', //greater than
        gte: '',
        in: [''],
        lt: '',
        lte: '', // less than or equal
        not: '',
        notIn: [''],
        startsWith: '',
      },
    },
  });
  console.log('theFirst', theFirst);
}

async function updateTest() {
  const res = await prisma.aaa.update({
    where: {
      id: 3,
    },
    data: {
      email: '333@xx.com',
    },
    select: {
      id: true,
      name: true,
    },
  });

  const updateMany = await prisma.aaa.updateMany({
    where: {
      email: {
        contains: '@',
      },
    },
    data: {
      name: 'new name',
    },
  });
  console.log('updateMany', updateMany);
}
