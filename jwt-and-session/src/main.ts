import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'ginlon', // 指定加密密钥
      resave: false, // 为 true 时，每次访问都会更新 session，false 时只有 session 内容变化了才会更新
      saveUninitialized: false, // true 不管是否设置 session 都会初始化一个空的 session 对象
    }),
  );
  await app.listen(3000);
}
bootstrap();
