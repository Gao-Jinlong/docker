import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { SessionService } from './session/session.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Inject()
  private sessionService: SessionService;
  constructor(private readonly appService: AppService) {}

  @Get('count')
  async count(
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    const sid = req.cookies?.sid;

    const session = await this.sessionService.getSession<{ count: string }>(
      sid,
    );

    const curCount = session.count ? +session.count + 1 : 1;
    const curSid = await this.sessionService.setSession(sid, {
      count: curCount,
    });

    res.cookie('sid', curSid, { maxAge: 30 * 60 * 1000 });

    return curCount;
  }
}
