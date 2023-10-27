import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {
  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;
  async getHello() {
    const keys = await this.redisClient.keys('*');

    console.log(keys);

    return 'Hello World!';
  }
}
