import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { Request } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用版本号配置
  // 通过 header 的 version 字段来指定版本号
  // app.enableVersioning({
  //   type: VersioningType.HEADER,
  //   header: 'version',
  // });

  // app.enableVersioning({
  //   type: VersioningType.MEDIA_TYPE, // 在 Accept 的 header 中指定版本号
  //   key: 'vv=',
  // });

  // app.enableVersioning({
  //   type: VersioningType.URI, // 在 URI 中指定版本号，此种方式不支持 VERSION_NEUTRAL 配置，需要明确指定版本号
  // });

  function extractor(request: Request) {
    if (request.headers['disable-custom']) {
      return '';
    }
    return request.url.includes('ginlon') ? '2' : '1';
  }

  app.enableVersioning({
    type: VersioningType.CUSTOM, // 自定义版本号提取器
    extractor,
  });

  await app.listen(3000);
}
bootstrap();
