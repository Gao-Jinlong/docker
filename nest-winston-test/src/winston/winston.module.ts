import { DynamicModule, Global, Module } from '@nestjs/common';
import { MyLogger } from 'src/MyLogger';
import { LoggerOptions } from 'winston';

export const WINSTON_MODULE_TOKEN = 'WINSTON_MODULE_TOKEN';

@Global()
@Module({})
export class WinstonModule {
  public static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: WinstonModule,
      providers: [
        {
          provide: WINSTON_MODULE_TOKEN,
          useValue: new MyLogger(options),
        },
      ],
      exports: [WINSTON_MODULE_TOKEN],
    };
  }
}
