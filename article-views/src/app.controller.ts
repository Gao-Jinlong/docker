import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';

@Controller()
export class AppController {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;
  constructor(private readonly appService: AppService) {}

  @Get('init-data')
  async initData() {
    await this.entityManager.save(User, {
      username: 'ginlon',
      password: '123456',
    });

    await this.entityManager.save(User, {
      username: 'liming',
      password: '123456',
    });

    await this.entityManager.save(Article, {
      title: '文章标题111',
      content: `文章内容11111
      Consectetur sit laborum consectetur sint mollit cillum. Cillum proident consequat enim ullamco est eu excepteur excepteur excepteur aliqua ea magna esse. Do reprehenderit proident excepteur non proident et officia duis. Ipsum elit adipisicing est ex enim pariatur incididunt labore reprehenderit nisi adipisicing occaecat.
      Proident occaecat fugiat aliqua veniam ipsum. Aliquip consequat ex quis ad nisi sunt. Anim id exercitation fugiat veniam nisi fugiat dolor commodo elit Lorem est qui. Tempor est laborum qui excepteur nostrud mollit enim. Pariatur et sint eu occaecat ex minim cillum id commodo ipsum aute sint.
      `,
    });

    await this.entityManager.save(Article, {
      title: '文章标题2222',
      content: `文章内容2222
      Consectetur sit laborum consectetur sint mollit cillum. Cillum proident consequat enim ullamco est eu excepteur excepteur excepteur aliqua ea magna esse. Do reprehenderit proident excepteur non proident et officia duis. Ipsum elit adipisicing est ex enim pariatur incididunt labore reprehenderit nisi adipisicing occaecat.
      Proident occaecat fugiat aliqua veniam ipsum. Aliquip consequat ex quis ad nisi sunt. Anim id exercitation fugiat veniam nisi fugiat dolor commodo elit Lorem est qui. Tempor est laborum qui excepteur nostrud mollit enim. Pariatur et sint eu occaecat ex minim cillum id commodo ipsum aute sint.
      `,
    });

    return 'success';
  }
}
