import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  @InjectEntityManager()
  entityManager: EntityManager;

  async findAll() {
    // const city = new City();
    // city.name = '华北';
    // await this.entityManager.save(city);

    // const cityChild = new City();
    // cityChild.name = '山东';
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '华北',
    //   },
    // });

    // if (parent) {
    //   cityChild.parent = parent;
    // }

    // await this.entityManager.save(City, cityChild);

    // const city = new City();
    // city.name = '华南';
    // await this.entityManager.save(city);

    // const cityChild1 = new City();
    // cityChild1.name = '云南';
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '华南',
    //   },
    // });
    // if (parent) {
    //   cityChild1.parent = city;
    // }
    // await this.entityManager.save(City, cityChild1);

    // const cityChild2 = new City();
    // cityChild2.name = '昆明';
    // const parent2 = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // if (parent2) {
    //   cityChild2.parent = parent2;
    // }
    // await this.entityManager.save(City, cityChild2);

    return this.entityManager.getTreeRepository(City).findTrees();
  }
  async findRoot() {
    return this.entityManager.getTreeRepository(City).findRoots();
  }

  /**
   * 查询某个节点的后代
   */
  async findDescendants() {
    const parent = await this.entityManager.findOne(City, {
      where: {
        name: '云南',
      },
    });
    return this.entityManager
      .getTreeRepository(City)
      .findDescendantsTree(parent);
  }

  /**
   * 查询祖先节点
   */
  async findAncestorsTree() {
    const parent = await this.entityManager.findOne(City, {
      where: {
        name: '云南',
      },
    });

    // return this.entityManager.getTreeRepository(City).findAncestorsTree(parent);
    // 扁平化返回
    // return this.entityManager.getTreeRepository(City).findAncestors(parent);
    // 计数
    return this.entityManager.getTreeRepository(City).countAncestors(parent);
  }
}
