import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager;
  @Inject()
  private jwtService: JwtService;
  async login(loginUser: LoginUserDto) {
    const user = await this.validateUser(loginUser);
    const tokens = this.registerToken(user);

    return tokens;
  }
  async validateUser(loginUser: LoginUserDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUser.username,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.EXPECTATION_FAILED);
    }

    if (user.password !== loginUser.password) {
      throw new HttpException(
        'Password is wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return user;
  }
  async registerToken(user: User) {
    const accessToken = this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn: '30m',
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn: '7d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const userInfo: Request['user'] = this.jwtService.verify(refreshToken);

      const user = await this.entityManager.findOne(User, {
        where: {
          id: userInfo.id,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Please login');
      }

      const tokens = this.registerToken(user);

      return tokens;
    } catch (e) {
      throw new UnauthorizedException('Please login');
    }
  }
}
