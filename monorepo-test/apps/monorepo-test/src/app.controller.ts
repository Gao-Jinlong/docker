import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { LibTestService } from '@app/lib-test';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() + 'main server';
  }

  @Inject(LibTestService)
  private libTestService: LibTestService;

  @Get('lib-test')
  getLibTestService() {
    return this.libTestService.helloLibTest() + ' main server';
  }

  @Inject('USER_SERVICE')
  private userServiceClient: ClientProxy;

  @Get('user-service')
  getUserService() {
    return this.userServiceClient.send<string, string>(
      'getHello',
      'ginlon',
    ) as any;
  }
}
