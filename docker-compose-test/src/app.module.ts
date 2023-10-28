import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { createClient } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-container',
      port: 3306,
      username: 'root',
      password: 'ginlon',
      database: 'docker_compose_test',
      synchronize: true,
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'redis-container',
            port: 6379,
          },
        });

        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule {}
