import {
  Controller,
  Get,
  Inject,
  Headers,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import { RedisClientType } from 'redis';
import { JwtService } from '@nestjs/jwt';

interface QrcodeStatus {
  status:
    | 'noscan'
    | 'scan-wait-confirm'
    | 'scan-confirm'
    | 'scan-cancel'
    | 'expired';

  userInfo: {
    userId: number;
  };
}

@Controller()
export class AppController {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  @Inject(JwtService)
  private jstService: JwtService;

  private users = [
    { id: 1, username: 'admin', password: 'admin', role: 'admin' },
    { id: 2, username: 'ginlon', password: '111', role: 'admin' },
  ];

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('qrcode/generate')
  async generate() {
    const uuid = randomUUID();
    const dataUrl = await qrcode.toDataURL(
      `http://192.168.31.159:3000/pages/confirm.html?id=${uuid}`,
    );

    await this.redisClient.hSet(uuid, {
      status: 'noscan',
    });
    await this.redisClient.expire(uuid, 60 * 5);

    return {
      qrcode_id: uuid,
      img: dataUrl,
    };
  }

  @Get('qrcode/check')
  async check(@Query('id') id: string) {
    return this.redisClient.hGet(id, 'status');
  }

  @Get('qrcode/scan')
  async scan(@Query('id') id: string) {
    const status = await this.redisClient.hGet(id, 'status');
    if (status === 'noscan') {
      await this.redisClient.hSet(id, {
        status: 'scan-wait-confirm',
      });
      await this.redisClient.expire(id, 60 * 5);
      return 'ok';
    }
    return 'fail';
  }

  @Get('qrcode/confirm')
  async confirm(
    @Query('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    const [, token] = auth.split(' ');
    const userId = await this.jstService.verify(token).userId;

    if (!userId) {
      throw new UnauthorizedException('用户不存在');
    }

    const user = this.users.find((u) => {
      return u.id === userId;
    });

    const status = await this.redisClient.hGet(id, 'status');
    if (status === 'scan-wait-confirm') {
      await this.redisClient.hSet(id, {
        status: 'scan-confirm',
      });
      await this.redisClient.expire(id, 60 * 5);
      return {
        user,
        status: 'ok',
      };
    }
    return 'fail';
  }

  @Get('qrcode/cancel')
  async cancel(@Query('id') id: string) {
    const status = await this.redisClient.hGet(id, 'status');
    if (status === 'scan-wait-confirm') {
      await this.redisClient.hSet(id, {
        status: 'scan-cancel',
      });
      await this.redisClient.expire(id, 60 * 5);
      return 'ok';
    }
    return 'fail';
  }

  @Get('login')
  async login(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    const user = this.users.find((u) => {
      return u.username === username;
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('密码错误');
    }

    return {
      token: await this.jstService.sign({
        userId: user.id,
      }),
    };
  }

  @Get('userInfo')
  async userInfo(@Query('token') token: string) {
    const payload = await this.jstService.verify(token);

    const user = this.users.find((u) => {
      return u.id === payload.userId;
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    return {
      username: user.username,
      role: user.role,
    };
  }
}
