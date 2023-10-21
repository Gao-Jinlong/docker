import {
  Controller,
  Get,
  Post,
  Body,
  Session,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { LoginGuard } from 'src/aop/login/login.guard';
import { PermissionGuard } from 'src/user/aop/permission/permission.guard';
import { PermissionEnum } from 'src/user/entities/permission.entity';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  @UseGuards(LoginGuard, PermissionGuard)
  @SetMetadata('permission', [PermissionEnum.SuperAdmin])
  async findAll() {
    return await this.departmentService.findAll();
  }

  @Post()
  @UseGuards(LoginGuard)
  async create(@Body() CreateDepartmentDto, @Session() session) {
    return 'create';
  }
}
