import { Controller, Get, Inject, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisService } from 'src/redis/redis.service';

@Controller('email')
export class EmailController {
  @Inject()
  private redisService: RedisService;
  constructor(private readonly emailService: EmailService) {}

  @Get('code')
  async sendEmailCode(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 6);

    await this.redisService.set(`captcha_${address}`, code, 5 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<p>您的验证码为：${code}</p>`,
    });

    return '发送成功';
  }
}
