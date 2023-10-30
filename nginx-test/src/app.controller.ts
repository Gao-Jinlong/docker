import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api')
  hello(@Headers() headers) {
    // console.log(headers);
    console.log('access');
    return 'hello nginx!';
  }
}
