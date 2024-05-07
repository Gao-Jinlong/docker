import { Controller, Get, Header, Res, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { createReadStream, readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('download')
  @Header('Content-Disposition', 'attachment; filename=package.json')
  download(@Res() res: Response) {
    const content = readFileSync('package.json');

    res.end(content);
  }

  @Get('download2')
  @Header('content-disposition', 'attachment; filename=package.json')
  download2(@Res() res: Response) {
    const stream = createReadStream('package.json');

    stream.pipe(res);
  }

  @Get('download3')
  download3() {
    const stream = createReadStream('package.json');

    // nestjs 封装的 StreamableFile 可以处理各种
    return new StreamableFile(stream, {
      disposition: 'attachment; filename="package.json"',
    });
  }
}
