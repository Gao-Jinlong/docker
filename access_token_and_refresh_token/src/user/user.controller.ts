import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Query,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { LoginGuard } from 'src/aop/login/login.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body() loginUser: LoginUserDto,
    @Res({
      passthrough: true,
    })
    res,
  ) {
    const token = await this.userService.login(loginUser);
    res.header('Authorization', `Bearer ${token.accessToken}`);
    res.header('RefreshToken', token.refreshToken);

    return {
      message: 'Login successfully',
    };
  }

  @Get('need-login')
  @UseGuards(LoginGuard)
  needLogin() {
    return {
      message: 'Need login',
    };
  }

  @Get('refresh')
  async refresh(
    @Query('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res,
  ) {
    const tokens = await this.userService.refreshToken(refreshToken);

    res.header('Authorization', `Bearer ${tokens.accessToken}`);
    res.header('RefreshToken', tokens.refreshToken);

    return {
      message: 'Refresh successfully',
    };
  }
}
