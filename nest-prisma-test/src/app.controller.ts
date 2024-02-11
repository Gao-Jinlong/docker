import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { DepartmentService } from './department.service';
import { EmployeeService } from './employee.service';

@Controller()
export class AppController {
  @Inject(DepartmentService)
  private departmentService: DepartmentService;
  @Inject(EmployeeService)
  private employeeService: EmployeeService;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('create')
  async create() {
    const department = await this.departmentService.create({
      name: '技术部',
    });

    await this.employeeService.create({
      name: '张三',
      phone: '13800138000',

      Department: {
        connect: {
          id: department.id,
        },
      },
    });

    return '创建成功';
  }
}
