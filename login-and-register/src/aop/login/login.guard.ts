import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokenPayload } from 'src/user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request & TokenPayload = context.switchToHttp().getRequest();

    const authorization = request.header('authorization') || '';

    const bearer = authorization.split(' ');

    if (!bearer || bearer.length !== 2 || bearer[0] !== 'Bearer') {
      throw new UnauthorizedException('请登入后再试');
    }

    const token = bearer[1];

    try {
      const info = this.jwtService.verify(token);
      request.user = info.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('登入失效，请重新登入');
    }
  }
}
