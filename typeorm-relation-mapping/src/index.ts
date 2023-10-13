import { AppDataSource } from './data-source';
import { IdCard } from './entity/IdCard';
import { User } from './entity/User';

AppDataSource.initialize()
  .then(async () => {
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
  })
  .catch((error) => console.log(error));
