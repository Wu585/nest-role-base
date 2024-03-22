import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./local-auth.guard";
import { CreateAuthDto, PublicCreateAuthDto } from "./dto/create-auth.dto";
import { Public } from "../decorators/public.decarator";
import { SerializeInterceptor } from "../common/interceptors/serialize.interceptor";
import { Serialize } from "../decorators/serialize.decorator";

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
  // @UseInterceptors(new SerializeInterceptor(PublicCreateAuthDto))
  @Serialize(PublicCreateAuthDto)
  @Post("register")
  async register(@Body() dto: CreateAuthDto) {
    const { username, password } = dto;
    return this.authService.register(username, password);
  }
}
