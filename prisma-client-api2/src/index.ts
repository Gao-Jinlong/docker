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
  // await create();
  await query();
  // await update();
  // await deleteTest();
  await rawSQLTest();
}
main();

async function create() {
  await prisma.department.create({
    data: {
      name: '技术部',
      employees: {
        // create: [
        //   {
        //     name: '小张',
        //     phone: '13333333333',
        //   },
        //   {
        //     name: '小李',
        //     phone: '13333333334',
        //   },
        // ],
        createMany: {
          data: [
            {
              name: '小孙',
              phone: '13433333333',
            },
            {
              name: '小周',
              phone: '13233333334',
            },
          ],
        },
      },
    },
  });
}

async function query() {
  const res = await prisma.department.findUnique({
    where: {
      id: 1,
    },
    include: {
      employees: true,
    },
  });

  console.log('res:', res);

  const res2 = await prisma.department.findUnique({
    where: {
      id: 1,
    },
    include: {
      employees: {
        where: {
          name: '小张',
        },
        select: {
          name: true,
        },
      },
    },
  });

  console.log('res2:', res2);

  const res3 = await prisma.department
    .findUnique({
      where: {
        id: 1,
      },
    })
    .employees();

  console.log('res3:', res3);
}

async function update() {
  const res = await prisma.department.update({
    where: {
      id: 1,
    },
    data: {
      name: '技术部2',
      employees: {
        create: [
          {
            name: '小刘',
            phone: '13333333335',
          },
        ],
        connect: [
          {
            id: 4,
          },
        ],
        connectOrCreate: {
          where: {
            id: 20,
          },
          create: {
            id: 20,
            name: '小王',
            phone: '13333333336',
          },
        },
      },
    },
  });

  console.log('update res', res);
}

async function deleteTest() {
  await prisma.employee.deleteMany({
    where: {
      department: {
        id: 1,
      },
    },
  });
}

async function rawSQLTest() {
  await prisma.$executeRaw`TRUNCATE TABLE Employee`;

  const res = await prisma.$queryRaw`select * from Department`;
  console.log('res', res);
}

// happy new year
