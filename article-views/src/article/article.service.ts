import { Injectable, Inject } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { RedisService } from 'src/redis/redis.service';
import { EntityManager } from 'typeorm';

@Injectable()
export class ArticleService {
  @Inject(RedisService)
  private redisService: RedisService;
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  async findOne(id: number) {
    const article = await this.entityManager.findOneBy(Article, {
      id,
    });

    return article;
  }

  async view(id: number, userId: string) {
    const res = await this.redisService.hashGet(`article_${id}`);

    if (res.viewCount === undefined) {
      const article = await this.findOne(id);

      article.viewCount++;

      await this.entityManager.update(
        Article,
        { id },
        {
          viewCount: article.viewCount,
        },
      );

      await this.redisService.hashSet(`article_${id}`, {
        viewCount: article.viewCount,
        likeCount: article.likeCount,
        collectCount: article.collectCount,
      });

      await this.redisService.set(`user_${userId}_article_${id}`, 1, 3);

      return { count: article.viewCount, form: 'db' };
    } else {
      const flag = await this.redisService.get(`user_${userId}_article_${id}`);

      if (flag) {
        return res.viewCount;
      }

      await this.redisService.hashSet(`article_${id}`, {
        ...res,
        viewCount: +res.viewCount + 1,
      });

      await this.redisService.set(`user_${userId}_article_${id}`, 1, 3);

      return { count: +res.viewCount + 1, form: 'redis' };
    }
  }

  async flushRedisToDB() {
    const keys = await this.redisService.keys(`article_*`);
    console.log(keys);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const res = await this.redisService.hashGet(key);

      const [, id] = key.split('_');

      await this.entityManager.update(
        Article,
        {
          id: +id,
        },
        {
          viewCount: +res.viewCount,
        },
      );
    }
  }
}
