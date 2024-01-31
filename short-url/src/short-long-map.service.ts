import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UniqueCodeService } from './unique-code.service';
import { UniqueCode } from './entities/UniqueCode.entity';
import { ShortLongMap } from './entities/ShortLongMap.entity';

@Injectable()
export class ShortLongMapService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject(UniqueCodeService)
  private uniqueCOdeService: UniqueCodeService;

  async generate(longUrl: string) {
    let uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      status: 0,
    });
    if (!uniqueCode) {
      uniqueCode = await this.uniqueCOdeService.generateCode();
    }
    const map = new ShortLongMap();
    map.shortUrl = uniqueCode.code;
    map.longUrl = longUrl;

    await this.entityManager.insert(ShortLongMap, map);
    await this.entityManager.update(
      UniqueCode,
      { id: uniqueCode.id },
      {
        status: 1,
      },
    );

    return uniqueCode;
  }

  async getLongUrl(shortUrl: string) {
    const map = await this.entityManager.findOneBy(ShortLongMap, {
      shortUrl: shortUrl,
    });

    if (!map) {
      return null;
    }
    return map.longUrl;
  }
}
