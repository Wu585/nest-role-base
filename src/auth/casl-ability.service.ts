import { Injectable } from "@nestjs/common";
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";
import { User, Role, Menu } from "@prisma/client";
import { UsersService } from "../users/users.service";
import { getEntities } from "../utils/common";

//验证实体定义
export type AppAbility = PureAbility<[string, Subjects<{ User: User, Role: Role, Menu: Menu }>], PrismaQuery>

@Injectable()
export class CaslAbilityService {
  constructor(private readonly usersService: UsersService) {
  }

  async forRoot(userId: number) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    const user = await this.usersService.findOne(userId);

    user.roles.forEach(role => {
      role.menus.forEach(menu => {
        console.log(menu);
        const { path, acl } = menu.menu;
        const actions = acl.split(",");
        actions.forEach((action) => {
          can(action, getEntities(path));
        });
      });
    });

    console.log('build()');
    console.log(build());

    return build();
  }
}
