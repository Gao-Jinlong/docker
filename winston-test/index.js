import winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    //   dirname: 'log',
    //   filename: 'test.log',
    //   maxsize: 1024, // 1kb
    // }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      dirname: 'log2',
      filename: 'test-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH-mm',
      maxSize: '1k',
    }),
  ],
});

logger.info('test info log');
logger.debug('test debug log');
logger.error('test error log');
