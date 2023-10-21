import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async listGet(key: string) {
    return await this.redisClient.lRange(key, 0, -1);
  }

  async listSet(key: string, list: string | Array<string>, ttl: number) {
    await this.redisClient.lPush(key, list);

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async hashGet(key: string, field: string) {
    return await this.redisClient.hGet(key, field);
  }
  async hashSet(key: string, field: string, value: string) {
    await this.redisClient.hSet(key, field, value);
  }
}
