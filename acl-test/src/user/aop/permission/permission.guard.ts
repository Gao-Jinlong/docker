import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(UserService)
  private userService: UserService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = request.session;
    const user = session.user;

    const permission = this.reflector.get('permission', context.getHandler());

    if (!permission) {
      return true;
    }

    // 每次都从数据库中获取最新的用户信息且是联表查询，性能会有一定的影响
    // 可以将权限信息存储在 jwt 中，这样就不用每次都去数据库中查询了，但是这样做的话，权限信息就不是实时的了
    // 更可靠的做法是将权限信息存储在 redis 中
    const foundUser = await this.userService.findById(user.id);

    if (!foundUser.permission.some((p) => permission.includes(p.weight))) {
      throw new UnauthorizedException('无权访问');
    }

    return true;
  }
}
