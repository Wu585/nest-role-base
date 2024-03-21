import {Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./local-auth.guard";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { Public } from "../decorators/public.decarator";
import {SerializeInterceptor} from "../common/interceptors/serialize.interceptor";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @UseInterceptors(SerializeInterceptor)
  @Post("register")
  async register(@Body() dto: CreateAuthDto) {
    const { username, password } = dto;
    return this.authService.register(username, password);
  }
}
