import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { In } from 'typeorm';
import { RedisClientType } from 'redis';
import { REDIS } from '../redis/redis.module';

@Injectable()
export class UserService {
  @Inject(JwtService)
  private jwtService: JwtService;
  @InjectEntityManager()
  private readonly entityManager;

  @Inject(REDIS)
  private readonly redisClient: RedisClientType;

  async initData() {
    const user1 = new User();
    user1.username = '张三';
    user1.password = '111';

    const user2 = new User();
    user2.username = '李四';
    user2.password = '222222';

    const user3 = new User();
    user3.username = '王五';
    user3.password = '333333';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.name = '查看用户列表';

    const permission2 = new Permission();
    permission2.name = '查看角色列表';

    const permission3 = new Permission();
    permission3.name = '查看权限列表';

    const permission4 = new Permission();
    permission4.name = '新增用户';

    const permission5 = new Permission();
    permission5.name = '删除用户';

    role1.permissions = [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
    ];

    role2.permissions = [permission1];

    user1.roles = [role1];
    user2.roles = [role2];
    user3.roles = [role2];

    await this.entityManager.save(User, [user1, user2, user3]);
    return {
      date: new Date(),
      message: '初始化成功',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const token = await this.registerToken(user);

    return token;
  }
  async validateUser(loginDto: LoginDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginDto.username,
      },
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.ACCEPTED);
    }

    if (user.password !== loginDto.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }

    return user;
  }
  async registerToken(user: User) {
    const token = this.jwtService.sign({
      user: {
        username: user.username,
        roles: user.roles,
      },
    });

    return 'Bearer ' + token;
  }

  async findAll() {
    const USER_LIST = 'userList';
    let users = await this.redisClient.lRange(USER_LIST, 0, -1);

    if (users.length) {
      console.log('redis', users);
      return users.map((item) => JSON.parse(item));
    }
    users = await this.entityManager.find(User).then((res) => {
      return res.map((item) => {
        return {
          username: item.username,
        };
      });
    });

    await this.redisClient.lPush(
      USER_LIST,
      users.map((item) => JSON.stringify(item)),
    );
    this.redisClient.expire(USER_LIST, 60 * 10);

    return users;
  }

  async findRolesById(roleIds: number[]) {
    return await this.entityManager.find(Role, {
      where: {
        id: In(roleIds),
      },
      relations: {
        permissions: true,
      },
    });
  }
}
