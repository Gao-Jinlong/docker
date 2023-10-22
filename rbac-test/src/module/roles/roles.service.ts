import { Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Role } from '../user/entities/role.entity';

@Injectable()
export class RolesService {
  @InjectEntityManager()
  private readonly entityManager;

  async findAll() {
    return await this.entityManager.find(Role, {
      relations: {
        permissions: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
