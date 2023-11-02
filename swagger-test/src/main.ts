import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Test example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBasicAuth({
      type: 'http',
      name: 'basic',
      description: 'basic auth',
    })
    .addCookieAuth('session-id', {
      type: 'apiKey',
      name: 'cookie',
      description: 'cookie auth',
    })
    .addBearerAuth({
      type: 'http',
      description: 'jwt auth',
      name: 'bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
