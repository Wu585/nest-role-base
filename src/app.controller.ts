import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import {AppService} from "./app.service";
import {ConfigService} from "@nestjs/config";
import {CaslGuard} from "./guards/casl.guard";
import {Can, CheckPolicies} from "./decorators/casl.decorator";
import {Action} from "./enum/action.enum";
import {RoleGuard} from "./guards/role.guard";
import {Roles} from "./decorators/roles.decarator";

@Controller()
@UseGuards(CaslGuard)
@CheckPolicies(ability => ability.can(Action.Read, 'User'))
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {
  }

  @UseGuards(RoleGuard)
  @Roles(3)
  @Get()
  @Can(Action.Read, 'User')
  getHello(@Request() req) {
    return req.user;
  }
}
