import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";

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

    if (user && user.password === pass) {
      const {password, ...result} = user;
      return result;
    }

    return null;
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
    })
  }
}
