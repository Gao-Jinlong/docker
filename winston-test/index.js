import winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
  level: 'debug', // 日志级别 从低到高依次是 silly, debug, verbose, http, info, warn, error 只会输出大于等于设定级别的日志
  // format: winston.format.simple(), // 日志格式
  // format: winston.format.json(), // 日志格式
  format: winston.format.combine(
    // 组合日志格式
    winston.format.label({ label: 'right meow!' }), // 日志中添加标签
    winston.format.timestamp(), // 日志中添加时间戳
    winston.format.json(),
  ), // 日志格式
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        // 不同的 transport 可以有不同的日志格式
        winston.format.colorize(), // 日志中添加颜色
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      dirname: 'log',
      filename: 'test.log',
      maxsize: 1024, // 1kb
      format: winston.format.json(),
    }),

    // new winston.transports.DailyRotateFile({
    //   level: 'info',
    //   dirname: 'log2',
    //   filename: 'test-%DATE%.log',
    //   datePattern: 'YYYY-MM-DD-HH-mm',
    //   maxSize: '1k',
    // }),

    new winston.transports.Http({
      host: 'localhost',
      port: '3000',
      path: '/log',
    }),
  ],
  exceptionHandlers: [
    // 未捕获异常日志
    new winston.transports.File({
      filename: 'error.log',
    }),
  ],
  rejectionHandlers: [
    // 未捕获 promise rejection 异常日志
    new winston.transports.File({
      filename: 'rejection.log',
    }),
  ],
});

// throw new Error('test error');
await Promise.reject('test promise rejection');

logger.info('test info log');
logger.debug('test debug log');
logger.error('test error log');

// #region 多实例
// winston.loggers.add('console', {
//   level: 'debug',
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.simple(),
//   ),
//   transports: [new winston.transports.Console()],
// });

// winston.loggers.add('file', {
//   level: 'debug',
//   format: winston.format.combine(
//     winston.format.json(),
//     winston.format.timestamp(),
//   ),
//   transports: [
//     new winston.transports.File({
//       dirname: 'log4',
//       filename: 'test.log',
//       format: winston.format.json(),
//     }),
//   ],
// });

// const loggerConsole = winston.loggers.get('console');
// loggerConsole.info('test info log');
// loggerConsole.debug('test debug log');
// loggerConsole.error('test error log');

// const loggerFile = winston.loggers.get('file');
// loggerFile.info('test info log');
// loggerFile.debug('test debug log');
// loggerFile.error('test error log');
// #endregion
