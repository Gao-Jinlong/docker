import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

export interface TokenPayload {
  user: {
    id: number;
    username: string;
  };
}
function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;
  @Inject(JwtService)
  private jwtService: JwtService;
  private logger = new Logger();

  async login(user: LoginDto) {
    const fondUser = await this.validateUser(user);

    const token =
      'Bearer ' +
      (await this.jwtService.signAsync({
        user: {
          id: fondUser.id,
          username: fondUser.username,
        },
      } as TokenPayload));

    return token;
  }
  async validateUser(user: LoginDto) {
    if (!user.username || !user.password) {
      throw new HttpException('用户名或密码不能为空', 200);
    }
    const fondUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (!fondUser) {
      throw new HttpException('用户名不存在', 200);
    }
    if (fondUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }

    return fondUser;
  }

  async register(user: RegisterDto) {
    const fondUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (fondUser) {
      throw new HttpException('用户名已存在', 200);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      return {
        message: '注册成功',
      };
    } catch (e) {
      this.logger.error(e, UserService);
      return {
        message: '注册失败',
      };
    }
  }

  async detail() {
    return {
      message: '获取成功',
      data: {
        name: 'ginlon',
        age: 18,
      },
    };
  }
}
