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

declare module 'express' {
  interface Request {
    user: {
      id: number;
    };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private jwtService: JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Please login');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);

      request.user = data;

      return true;
    } catch (e) {
      throw new UnauthorizedException('Please login');
    }
    return true;
  }
}
