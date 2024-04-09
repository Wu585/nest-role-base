import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { PrismaService } from "../prisma.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [RolesController],
  providers: [RolesService, PrismaService]
})
export class RolesModule {
}
