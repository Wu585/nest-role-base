import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AppService } from "./app.service";
import { ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AdminGuard } from "./guards/admin/admin.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) {
  }

  @UseGuards(AdminGuard)
  @Get()
  getHello(@Request() req) {
    return req.user;
  }
}
