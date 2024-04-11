import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enum/roles.enum";
import { ROLES_KEY } from "../decorators/roles.decarator";
import { UsersService } from "../users/users.service";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly userService: UsersService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 可以通过的角色id
    const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    console.log('requiredRoles');
    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findOne(request.user.id);
    const roleIds = user.roles.map(o => o.id);
    return requiredRoles.some(role => roleIds.includes(role));
  }
}