import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { RequireLogin } from 'src/aop/require-login/require-login.decorator';
import { RequirePermission } from 'src/aop/require-permission/require-permission.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('initData')
  async initData() {
    return await this.userService.initData();
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({
      passthrough: true,
    })
    response: Response,
  ) {
    const token = await this.userService.login(loginDto);
    if (!token) {
      throw new HttpException('登录失败', HttpStatus.ACCEPTED);
    }

    response.header('Authorization', token);
    console.log(token);

    return token;
  }

  @Get()
  @RequireLogin()
  @RequirePermission('查看用户列表')
  async findAll() {
    return await this.userService.findAll();
  }
}
