import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  @Inject()
  private configService: ConfigService;
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      msg: this.appService.getHello(),
      // aaa: this.configService.get('aaa'),
      // bbb: this.configService.get('bbb'),
      database: this.configService.get('database'),
      yaml: this.configService.get('aaa.bbb.ccc'),
    };
  }
}
