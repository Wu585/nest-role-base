import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from "../../users/users.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {
  }

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = await this.userService.findOne(req.user.id);

    return !!user.roles.find(role => role.id === 2);
  }
}
