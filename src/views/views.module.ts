import { Logger, Module } from "@nestjs/common";
import { ViewsService } from "./views.service";
import { ViewsController } from "./views.controller";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [ViewsController],
  providers: [ViewsService, PrismaService]
})
export class ViewsModule {
}
