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
  // await updateTest();
  await upsert();
  // await deleteTest();
  await countTest();
  await aggregateTest();
  await groupByTest();
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

async function upsert() {
  const res = await prisma.aaa.upsert({
    where: {
      id: 11,
    },
    update: {
      email: 'yyy@xx.com',
    },
    create: {
      id: 11,
      name: 'xx',
      email: 'xxx@xx.com',
    },
  });
}

async function deleteTest() {
  await prisma.aaa.delete({
    where: { id: 1 },
  });

  await prisma.aaa.deleteMany({
    where: {
      id: {
        in: [11, 2],
      },
    },
  });
}

async function countTest() {
  const res = await prisma.aaa.count({
    where: {
      email: {
        contains: 'xx',
      },
    },
    orderBy: {
      name: 'desc',
    },
    skip: 2,
    take: 3,
  });
  console.log('res', res);
}

async function aggregateTest() {
  await prisma.aaa.update({
    where: {
      id: 3,
    },
    data: {
      age: 3,
    },
  });
  await prisma.aaa.update({
    where: {
      id: 5,
    },
    data: {
      age: 5,
    },
  });

  const res = await prisma.aaa.aggregate({
    where: {
      email: {
        contains: '@',
      },
    },
    _count: {
      _all: true,
    },
    _max: {
      age: true,
    },
    _min: {
      age: true,
    },
    _avg: {
      age: true,
    },
  });
  console.log('res', res);
}

async function groupByTest() {
  const res = await prisma.aaa.groupBy({
    by: ['email'],
    _count: {
      _all: true,
    },
    _sum: {
      age: true,
    },
    having: {
      age: {
        _avg: {
          gt: 2,
        },
      },
    },
  });

  console.log('groupBy', res);
}
