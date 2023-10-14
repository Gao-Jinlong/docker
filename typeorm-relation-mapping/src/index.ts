import { AppDataSource } from './data-source';
import { Article } from './entity/Article';
import { Department } from './entity/Department';
import { Employee } from './entity/Employee';
import { IdCard } from './entity/IdCard';
import { Tag } from './entity/Tag';
import { User } from './entity/User';

(async function main() {
  try {
    await AppDataSource.initialize();
    // await dropTable();
    // runOneToOne()
    // runManyToOne();
    runManyToMany();
  } catch (e) {
    console.log(e);
  }
})();

async function dropTable() {
  await AppDataSource.manager.query('drop table id_card');
  await AppDataSource.manager.query('drop table user');
  await AppDataSource.manager.query('drop table employee');
  await AppDataSource.manager.query('drop table department');
}

async function runOneToOne() {
  const user = new User();
  user.firstName = 'Gao';
  user.lastName = 'Ginlon';
  user.age = 18;

  const idCard = new IdCard();
  idCard.cardName = '123456789012345678';
  idCard.user = user;

  await AppDataSource.manager.save(user);
  await AppDataSource.manager.save(idCard);

  const idCards = await AppDataSource.manager.find(IdCard, {
    // 相关联的对象也会被查询出来
    relations: {
      user: true,
    },
  });
  console.log(idCards);

  const idCards2 = await AppDataSource.manager
    .getRepository(IdCard)
    .createQueryBuilder('ic')
    .leftJoinAndSelect('ic.user', 'u')
    .getMany();
  console.log(idCards2);

  // 更新
  const user2 = new User();
  user2.id = 1;
  user2.firstName = 'g';
  user2.lastName = 'ginlon';
  user2.age = 19;

  const idCard2 = new IdCard();
  idCard2.id = 1;
  idCard.cardName = '987654321098765432';
  idCard2.user = user2;

  await AppDataSource.manager.save(idCard2);

  // 删除
  await AppDataSource.manager.delete(User, 1);

  // 通过主表查询关联表
  const user3 = await AppDataSource.manager.find(User, {
    relations: {
      idCard: true,
    },
  });
  console.log(user3);
}

async function runManyToOne() {
  const dept1 = new Department();
  dept1.name = '技术部';

  const employee1 = new Employee();
  employee1.name = '张三';
  employee1.department = dept1;

  const employee2 = new Employee();
  employee2.name = '李四';
  employee2.department = dept1;

  const employee3 = new Employee();
  employee3.name = '王五';
  employee3.department = dept1;

  // 设置级联保存后只需要保存一个表，关联表也会被保存
  // await AppDataSource.manager.save(Department, dept1);
  // await AppDataSource.manager.save(Employee, [employee1, employee2, employee3]);

  dept1.employees = [employee1, employee2, employee3];
  // 通过一对多来保存
  await AppDataSource.manager.save(dept1);

  const deps = await AppDataSource.manager.find(Department, {
    relations: {
      employees: true,
    },
  });
  console.log(deps);
  console.log(deps.map((dep) => dep.employees));

  const employees = await AppDataSource.manager
    .getRepository(Department)
    .createQueryBuilder('dep')
    .leftJoinAndSelect('dep.employees', 'emp')
    .getMany();
  console.log(employees);
}

async function runManyToMany() {
  const article1 = new Article();
  article1.title = '文章 1';
  article1.content = '111111111111111111111';

  const article2 = new Article();
  article2.title = '文章 2';
  article2.content = '222222222222222222222';

  const article3 = new Article();
  article3.title = '文章 3';
  article3.content = '333333333333333333333';

  const tag1 = new Tag();
  tag1.name = '标签 1';

  const tag2 = new Tag();
  tag2.name = '标签 2';

  const tag3 = new Tag();
  tag3.name = '标签 3';

  article1.tags = [tag1, tag2];
  article2.tags = [tag2, tag3];

  const entityManager = AppDataSource.manager;

  await entityManager.save(tag1);
  await entityManager.save(tag2);
  await entityManager.save(tag3);

  await entityManager.save(article1);
  await entityManager.save(article2);

  let articles = await entityManager.find(Article, {
    relations: {
      tags: true,
    },
  });

  console.log(articles);
  console.log(articles.map((article) => article.tags));

  articles = await entityManager
    .getRepository(Article)
    .createQueryBuilder('art')
    .leftJoinAndSelect('art.tags', 'tag')
    .getMany();

  console.log(articles);

  // 更新
  const article4 = await entityManager.findOne(Article, {
    where: {
      id: 2,
    },
    relations: {
      tags: true,
    },
  });
  article4.title = '文章 4';
  article4.tags = [tag1, tag2, tag3];

  await entityManager.save(article4);

  entityManager.delete(Article, 1);
  entityManager.delete(Tag, 1);

  articles = await entityManager.find(Article, {
    relations: {
      tags: true,
    },
  });

  console.log(articles);

  let tags = await entityManager.find(Tag, {
    relations: {
      articles: true,
    },
  });
  console.log(tags);
}
