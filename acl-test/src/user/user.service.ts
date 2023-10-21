import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  Permission,
  PermissionEnum,
  PermissionEnumTitle,
} from './entities/permission.entity';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/loginUser.dto';
import { Department } from 'src/department/entities/department.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async initData() {
    const normal = new Permission();
    normal.weight = PermissionEnum.Normal;
    normal.name = PermissionEnumTitle[PermissionEnum.Normal];

    const admin = new Permission();
    admin.weight = PermissionEnum.Admin;
    admin.name = PermissionEnumTitle[PermissionEnum.Admin];

    const superAdmin = new Permission();
    superAdmin.weight = PermissionEnum.SuperAdmin;
    superAdmin.name = PermissionEnumTitle[PermissionEnum.SuperAdmin];

    const department1 = new Department();
    department1.name = '技术部';
    department1.desc = '技术部';

    const department2 = new Department();
    department2.name = '财务部';
    department2.desc = '财务部';

    const user1 = new User();
    user1.username = 'ginlon';
    user1.password = 'ginlon';
    user1.permission = [superAdmin, admin, normal];
    user1.department = department1;

    const user2 = new User();
    user2.username = 'liwei';
    user2.password = 'liwei';
    user2.permission = [admin, normal];
    user2.department = department2;

    await this.entityManager.save([user1, user2]);

    return '初始化数据成功';
  }

  async login(loginUser: LoginUserDto) {
    const user = await this.validateUser(loginUser);

    return user;
  }

  async validateUser(loginUser: LoginUserDto) {
    const user = await this.entityManager.findOneBy(User, {
      username: loginUser.username,
    });

    if (!user) {
      throw new HttpException('用户名不存在', HttpStatus.ACCEPTED);
    }
    if (user.password !== loginUser.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }

    return user;
  }

  async findById(id: number) {
    const user = await this.entityManager.findOne(User, {
      where: {
        id: id,
      },
      relations: {
        permission: true,
      },
    });

    return user;
  }
}
