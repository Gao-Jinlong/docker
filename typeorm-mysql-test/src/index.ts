import { In } from 'typeorm';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'Gao';
    user.lastName = 'Ginlon';
    user.age = 18;
    user.email = 'xxxx@xxx.com';
    user.id = 1; // 指定了 id，会更新数据库中 id 为 1 的数据
    // await AppDataSource.manager.save(user); // 保存到数据库
    console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');

    console.log(
      'Here you can setup and run express / fastify / any other framework.',
    );

    // 批量插入, 修改只需要加入 id 字段即可
    // await AppDataSource.manager.save(User, [
    //   { firstName: 'Xiao', lastName: 'Hong', age: 19, email: 'aaa@aa.com' },
    //   { firstName: 'Xiao', lastName: 'Ming', age: 20, email: 'bbb@bbb.com' },
    //   { firstName: 'Xiao', lastName: 'Zhang', age: 21, email: 'ddd@ccc.com' },
    // ]);

    // EntityManager 还有其 update, insert 方法，它们不会先 select 查询一次，而 save 方法会先 select 查询一次

    // // 删除 delete
    // await AppDataSource.manager.delete(User, 1);
    // await AppDataSource.manager.delete(User, [2, 3]);
    // // remove 方法接收 Entity 实例，而不是 id
    // await AppDataSource.manager.remove(User, user);

    // 查询
    const users = await AppDataSource.manager.find(User); // 从数据库中查找
    console.log('Loaded users: ', users);
    // 条件查询
    const users2 = await AppDataSource.manager.findBy(User, {
      age: 20,
    });
    console.log('Loaded users2: ', users2);
    // 获取记录数
    const [users3, count] = await AppDataSource.manager.findAndCount(User);
    console.log('Loaded users3: ', users3, count);

    // 获取 entity 的操作类，简化参数
    const UserDataBase = AppDataSource.getRepository(User);
    // 自定义查询字段
    const users4 = await UserDataBase.find({
      select: {
        firstName: true,
        age: true,
      },
      where: {
        id: In([4, 11, 10]),
      },
      order: {
        age: 'ASC',
      },
    });
    console.log('Loaded users4: ', users4);

    // 直接执行 sql
    const users5 = await AppDataSource.manager.query(
      'select * from user where age in(?, ?)',
      [20, 21],
    );
    console.log('Loaded users5: ', users5);

    // sql 构造器，用于复杂的 sql 查询
    const queryBuilder = await AppDataSource.manager.createQueryBuilder();

    const users6 = await queryBuilder
      .select('user')
      .from(User, 'user')
      .where('user.age = :age', { age: 21 })
      .getOne();

    // 事务
    await AppDataSource.manager.transaction(async (manager) => {
      await manager.save(User, {
        id: 4,
        firstName: 'ginlon',
        age: 18,
      });
    });
  })
  .catch((error) => console.log(error));
