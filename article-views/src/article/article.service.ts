import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  @InjectEntityManager()
  private readonly entityManager;

  async findOne(id: number) {
    const article = await this.entityManager.findOneBy(Article, {
      id,
    });

    return article;
  }

  async view(id: number) {
    const article = await this.findOne(id);

    article.viewCount++;

    await this.entityManager.save(article);

    return article.viewCount;
  }
}
