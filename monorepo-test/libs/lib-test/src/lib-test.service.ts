import { Injectable } from '@nestjs/common';

@Injectable()
export class LibTestService {
  helloLibTest(): string {
    return 'Hello from lib-test';
  }
}
