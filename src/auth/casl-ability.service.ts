import { Injectable } from "@nestjs/common";
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";
import { User } from "@prisma/client";

//验证实体定义
export type AppAbility = PureAbility<[string, Subjects<{ User: User }>], PrismaQuery>

@Injectable()
export class CaslAbilityService {
  forRoot() {
    const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    can("read", "User");

    return build();
  }
}