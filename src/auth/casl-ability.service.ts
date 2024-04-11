import {Injectable} from "@nestjs/common";
import {AbilityBuilder, PureAbility} from "@casl/ability";
import {createPrismaAbility, PrismaQuery, Subjects} from "@casl/prisma";
import {User, Role} from "@prisma/client";
import {UsersService} from "../users/users.service";

//验证实体定义
export type AppAbility = PureAbility<[string, Subjects<{ User: User, Role: Role }>], PrismaQuery>

@Injectable()
export class CaslAbilityService {
  constructor(private readonly usersService: UsersService) {
  }

  async forRoot(userId: number) {
    const {can, cannot, build} = new AbilityBuilder<AppAbility>(createPrismaAbility);

    const user = await this.usersService.findOne(userId)

    user.roles.forEach(role=>{
      role.menus.forEach(menu=>{
        console.log(menu);
      })
    })

    can("read", "Role");
    // cannot("update", "Role");

    return build();
  }
}