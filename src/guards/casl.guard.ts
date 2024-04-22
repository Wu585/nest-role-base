import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { UsersService } from "../users/users.service";
import { CaslAbilityService } from "../auth/casl-ability.service";
import { CaslHandlerType, CHECK_POLICIES_KEY, PolicyHandlerCallback } from "../decorators/casl.decorator";

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly caslAbilityService: CaslAbilityService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handlers = this.reflector.getAllAndMerge<PolicyHandlerCallback[]>(CHECK_POLICIES_KEY.HANDLER, [context.getHandler(), context.getClass()]);
    const canHandlers = this.reflector.getAllAndMerge<CaslHandlerType>(CHECK_POLICIES_KEY.CAN, [context.getHandler(), context.getClass()]) as CaslHandlerType;
    const cannotHandlers = this.reflector.getAllAndMerge<CaslHandlerType>(CHECK_POLICIES_KEY.CANNOT, [context.getHandler(), context.getClass()]) as CaslHandlerType;

    if (handlers.length <= 0 && canHandlers.length && canHandlers.length <= 0 && cannotHandlers.length && cannotHandlers.length <= 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (request.user) {
      const ability = await this.caslAbilityService.forRoot(request.user.id);

      let flag = true;

      if (handlers) {
        flag = flag && handlers.every(handler => handler(ability));
      }
      if (flag && canHandlers) {
        if (canHandlers instanceof Array) {
          flag = flag && canHandlers.every(handler => handler(ability));
        } else if (typeof canHandlers === "function") {
          flag = flag && canHandlers(ability);
        }
      }
      if (flag && cannotHandlers) {
        if (cannotHandlers instanceof Array) {
          flag = flag && cannotHandlers.every(handler => handler(ability));
        } else if (typeof cannotHandlers === "function") {
          flag = flag && cannotHandlers(ability);
        }
      }
      return flag;
    } else {
      return false;
    }
  }
}
