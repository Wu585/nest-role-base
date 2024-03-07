import {Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateAuthDto} from "./dto/create-auth.dto";
import {UpdateAuthDto} from "./dto/update-auth.dto";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    console.log("req.user");
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() dto) {
    const {username, password} = dto
    console.log(username,password);
    return this.authService.register(username, password)
  }
}
