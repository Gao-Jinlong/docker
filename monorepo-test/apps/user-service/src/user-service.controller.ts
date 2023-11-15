import { Controller, Get, Inject } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { LibTestService } from '@app/lib-test';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  getHello(): string {
    return this.userServiceService.getHello() + 'user service';
  }

  @Inject(LibTestService)
  private libTestService: LibTestService;
  @Get('lib-test')
  getLibTestService() {
    return this.libTestService.helloLibTest() + ' user service';
  }

  @MessagePattern('getHello')
  getHelloFromMain(str: string): string {
    return this.userServiceService.getHello() + 'user service ' + str;
  }
}
