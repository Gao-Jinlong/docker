import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { generateRandomStr } from './utils';
import { UniqueCode } from './entities/UniqueCode.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UniqueCodeService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async generateCode(): Promise<UniqueCode> {
    const str = generateRandomStr(6);

    const uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      code: str,
    });

    if (!uniqueCode) {
      const codeInstance = new UniqueCode();
      codeInstance.code = str;
      codeInstance.status = 0;

      return codeInstance;
    } else {
      return await this.generateCode();
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async batchGenerateCode() {
    const results: UniqueCode[] = [];
    const queue: Promise<UniqueCode>[] = [];
    for (let i = 0; i < 100; i++) {
      queue.push(this.generateCode());
    }
    await Promise.all(queue).then((res) => {
      results.push(...res);
    });

    await this.entityManager.save(UniqueCode, results);
  }
}
