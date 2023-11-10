import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task.service';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule implements OnApplicationBootstrap {
  @Inject(SchedulerRegistry)
  private readonly schedulerRegistry: SchedulerRegistry;

  onApplicationBootstrap() {
    const jobs = this.schedulerRegistry.getCronJobs();

    console.log('jobs', jobs);
    console.log('jobs interval', this.schedulerRegistry.getIntervals());
    console.log(
      'jobs interval',
      this.schedulerRegistry.getInterval('schedule-task-interval'),
    );
    console.log('jobs timeout', this.schedulerRegistry.getTimeouts());

    jobs.forEach((item, key) => {
      item.stop();
      this.schedulerRegistry.deleteCronJob(key);
    });

    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((item) => {
      const interval = this.schedulerRegistry.getInterval(item);
      clearInterval(interval);

      this.schedulerRegistry.deleteInterval(item);
    });

    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((item) => {
      const timeout = this.schedulerRegistry.getTimeout(item);
      clearTimeout(timeout);

      this.schedulerRegistry.deleteTimeout(item);
    });

    console.log('jobs', this.schedulerRegistry.getCronJobs());

    const job = new CronJob(`0/5 * * * * *`, () => {
      console.log('cron job');
    });

    //@ts-expect-error - addCronJob is not in the type definition
    this.schedulerRegistry.addCronJob('schedule-task-cron', job);
    job.start();

    const interval = setInterval(() => {
      console.log('interval job');
    }, 3000);
    this.schedulerRegistry.addInterval('schedule-task-interval', interval);

    const timeout = setTimeout(() => {
      console.log('timeout job');
    }, 5000);
    this.schedulerRegistry.addTimeout('schedule-tasl-timeout', timeout);
  }
}
