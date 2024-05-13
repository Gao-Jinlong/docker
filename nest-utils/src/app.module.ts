import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProducerModule } from './producer/producer.module';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [
    PersonModule,
    EventEmitterModule.forRoot({
      wildcard: true, // 允许使用通配符
      delimiter: '.', // 用于分隔命名空间和事件名称的字符
    }),
    ProducerModule,
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
