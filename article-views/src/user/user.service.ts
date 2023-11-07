import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager;
  async login(loginUserDto: LoginUserDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUserDto.username,
      },
    });

    if (!user) {
      throw new BadRequestException('用户名或密码错误');
    }

    if (user.password !== loginUserDto.password) {
      throw new BadRequestException('用户名或密码错误');
    }

    return user;
  }
}
