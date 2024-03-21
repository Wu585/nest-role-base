import {ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        username
      }
    });

    if (!user) {
      throw new UnauthorizedException("用户不存在，请先注册");
    }

    const isPasswordValid = await argon2.verify(user.password, pass)

    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或密码错误')
    }

    const {password, ...result} = user;
    return result;
  }

  async login(user: any) {
    const payload = {username: user.username, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async register(username: string, password: string) {
    return this.userService.create({
      username,
      password
    });
  }
}
