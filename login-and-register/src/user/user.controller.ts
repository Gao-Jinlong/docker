import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { TokenPayload, UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { LoginGuard } from 'src/aop/login/login.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.login(user);

    if (token) {
      res.setHeader('Authorization', token);
      res.status(200).send({ message: '登入成功' });
    } else {
      res.status(401).send({ message: '登入失败' });
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }

  @Get('detail')
  @UseGuards(LoginGuard)
  async detail(@Req() req: Request & TokenPayload) {
    const user = req.user;
    return await this.userService.detail();
  }
}
// 近日懈怠，浅摸一把，劳逸结合，讯息渐进~
