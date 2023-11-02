import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UserVo } from './user.vo';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('init')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBasicAuth('basic')
  @ApiOperation({ summary: '测试', description: 'test description' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'access success',
    type: String,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'user name',
    example: 'ginlon',
  })
  @ApiQuery({
    name: 'age',
    type: Number,
    description: 'user age',
    required: false,
    example: 18,
  })
  @Get('test')
  getTest(@Query('name') name, @Query('age') age): string {
    console.log('test', name, age);
    return `Hello ${name}! You are ${age} years old!`;
  }

  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: '用户', description: 'user description' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'access success',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'access denied',
  })
  @ApiParam({
    name: 'name',
    description: 'user name',
    required: true,
    example: 'ginlon',
  })
  @Get('user/:name')
  getPerson(@Param('name') name): string {
    console.log('user', name);
    if (name !== 'ginlon') {
      throw new UnauthorizedException();
    }
    return `The page of ${name}!`;
  }

  @ApiCookieAuth('cookie')
  @ApiOperation({ summary: '登录', description: 'login description' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'access success',
    type: UserVo,
  })
  @ApiBody({
    type: UserDto,
  })
  @Post('login')
  login(@Body() user: UserDto) {
    console.log('login', user);
    const userInfo = new UserVo();
    userInfo.name = user.name;
    userInfo.age = user.age;
    return userInfo;
  }

  // 通过配置 nest-cli 添加 swagger 插件，可以自动生成 swagger 文档
  @Get('auto/:name')
  auto(@Param('name') name: string, @Body() user: UserDto) {
    console.log('auto', name, user);

    const userInfo = new UserVo();

    return userInfo;
  }
}
