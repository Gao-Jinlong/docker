import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject()
  private entityManager: EntityManager;
  async findUserByEmail(email: string) {
    return await this.entityManager.findOneBy(User, {
      email,
    });
  }
}
