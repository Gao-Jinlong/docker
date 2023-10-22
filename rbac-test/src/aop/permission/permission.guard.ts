import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Permission } from 'src/module/user/entities/permission.entity';
import { UserService } from 'src/module/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;
  @Inject(UserService)
  private userService: UserService;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;

    const requirePermissions = this.reflector.getAllAndOverride<string[]>(
      'require-permission',
      [context.getHandler(), context.getClass()],
    );

    if (!user || !requirePermissions) {
      return true;
    }

    const roles = await this.userService.findRolesById(
      user.roles.map((role) => role.id),
    );

    const permissions: Permission[] = roles.reduce((total, current) => {
      return total.concat(current.permissions);
    }, []);

    console.log(permissions, requirePermissions);

    const hasPermission = permissions.some((permission) =>
      requirePermissions.includes(permission.name),
    );

    if (!hasPermission) {
      throw new UnauthorizedException('没有权限');
    }

    return true;
  }
}
