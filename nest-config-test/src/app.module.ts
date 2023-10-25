import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import config from './config';
import config_yaml from './config_yaml';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: [
      //   // 前面的配置会覆盖后面的配置
      //   path.join(process.cwd(), '.aaa.env'),
      //   path.join(process.cwd(), '.env'),
      // ],

      // 可以动态获取配置文件，微服务的配置中心 etcd，consul 等也是动态获取的
      load: [config_yaml, config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
