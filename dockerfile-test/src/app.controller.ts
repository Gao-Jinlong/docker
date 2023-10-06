import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const KB = 2 * 10 * 8;
    const str = 'a'.repeat(KB);

    return this.appService.getHello();
  }
}
