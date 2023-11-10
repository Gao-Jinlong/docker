import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  /**
   * Cron 表达式有 7 个字段：
   * |字段|允许值|允许的特殊字符|
   * |---|---|---|
   * |Seconds|0-59|, - * /|
   * |Minutes|0-59|, - * /|
   * |Hours|0-23|, - * /|
   * |Day of month|1-31|, - * ? / L W C|
   * |Month|1-12 or JAN-DEC|, - * /|
   * |Day of week|1-7 or SUN-SAT|, - * ? / L C #|
   * |Year|empty, 1970-2099|, - * /|
   *
   * 1. * 表示任意值，当使用 * 时，表示你不关心当前这个字段的值是什么。
   * 2. ? 表示不指定值，使用的场景为不需要关心当前这个字段的值，只用于日期和星期这两个字段。
   * 3. - 表示区间，例如在 Minutes(分钟)字段使用 5-20，表示从5分到20分钟每分钟触发一次。
   * 4. , 表示指定多个值，例如在 Minutes(分钟)字段使用 5,20，表示在5和20分每分钟触发一次。
   * 5. / 符号用来指定数值的增量，例如在 Seconds(秒)字段使用 0/15，表示从0秒开始，每15秒钟触发一次。
   * 6. L 表示最后，只能出现在 Day of week(星期)和 Day of month(日期)字段，即每周/每月的最后一天。
   * 7. W 表示有效工作日(周一到周五)，只能出现在 Day of month(日期)字段。
   * 8. LW 可以在指定日期时连用，代表每月最后一个工作日。
   * 9. 星期位置 4#3 表示每个月第 3 周的星期三。同理，每个月第二周的星期天可以用 * * * ？ * 1#2 表示。
   * 10. 星期除了可以用 1-7 表示外，也可以用 SUN、MON、TUE、WED、THU、FRI、SAT 表示。
   */
  // 例：
  // */5 * * * * ? 每隔 5 秒执行一次
  // 0 0 5-15 * * ? 每天 5 - 15 点整点触发
  // 0 0 10,14,16 * * ? 每天 10 点、14 点、16 点整点触发
  // 0 0 12 ? * WED 表示每个星期三中午 12 点触发
  // 0 0 17 ? * TUES,THUR,SAT
  // 0 0 22 L * ? 每个月最后一天的 22 点整点触发
  // 0 30 9 ？ * 6L 2023-2025 每个月的最后一个周五上午 9:30 触发
  // 0 15 10 ? * 6#3 每个月的第三个周五上午 10:15 触发
  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'schedule-task', // 任务名称
    timeZone: 'Asia/Shanghai', // 时区 https://momentjs.com/timezone/
  })
  handleCron() {
    console.log('task execute');
  }

  @Interval('schedule-task-interval', 5000)
  handleInterval() {
    console.log('task Interval');
  }

  @Timeout(5000)
  handleTimeout() {
    console.log('task Timeout');
  }
}
