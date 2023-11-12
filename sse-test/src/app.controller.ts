import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { readFileSync } from 'fs';
const { exec } = require('child_process');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('stream')
  stream() {
    return new Observable((observer) => {
      observer.next({
        data: {
          msg: 'test',
        },
      });

      setTimeout(() => {
        observer.next({
          data: { msg: 'test2' },
        });
      }, 2000);

      setTimeout(() => {
        observer.next({
          data: {
            msg: {
              name: 'test3',
            },
          },
        });
      }, 4000);

      setInterval(() => {
        observer.next({
          data: {
            msg: 'heartbeat signal',
          },
        });
      }, 1000);
    });
  }

  @Sse('log')
  logStream() {
    const childProcess = exec('tail -f ./src/log');

    return new Observable((observer) => {
      childProcess.stdout.on('data', (msg) => {
        console.log(msg.toString());
        observer.next({
          data: {
            msg: msg.toString(),
          },
        });
      });
    });
  }

  @Sse('buffer')
  bufferStream() {
    return new Observable((observer) => {
      const json = readFileSync('./package.json').toJSON();

      observer.next({ data: { msg: json } });
    });
  }
}
