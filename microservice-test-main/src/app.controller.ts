import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('USER_SERVICE')
  private userClient: ClientProxy;

  @Get('sum')
  calc(@Query('num') str: string): number {
    const numArr = str.split(',').map((item) => parseInt(item));
    this.userClient.emit('log', `计算${str}的和`);
    return this.userClient.send('sum', numArr) as any;
  }
}
