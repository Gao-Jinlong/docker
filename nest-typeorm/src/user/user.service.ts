import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;
  // 直接注入 User 的 Repository，不需要再写 this.manager.getRepository(User)
  @InjectRepository(User)
  private userRepository;
  create(createUserDto: CreateUserDto) {
    // this.manager.save(User, createUserDto);
    this.userRepository.save(createUserDto);
  }

  findAll() {
    // return this.manager.find(User);
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.manager.find(User, {
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.manager.save(User, {
      id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    this.manager.delete(User, id);
  }
}
