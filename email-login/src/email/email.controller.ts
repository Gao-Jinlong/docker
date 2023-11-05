import { Controller, Get, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('code')
  async sendEmailCode(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 6);
    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<p>您的验证码为：${code}</p>`,
    });

    return '发送成功';
  }
}
