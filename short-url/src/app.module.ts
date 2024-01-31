import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueCode } from './entities/UniqueCode.entity';
import { UniqueCodeService } from './unique-code.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ShortLongMapService } from './short-long-map.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ginlon',
      database: 'short-url',
      synchronize: true,
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UniqueCodeService, ShortLongMapService],
})
export class AppModule {}
