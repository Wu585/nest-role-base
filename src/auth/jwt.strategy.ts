import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigEnum } from "../enum/config.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigEnum.JWT_SECRET_KEY)
    });
  }

  async validate(payload: any) {
    // return的值放在了req.user上面
    return { id: payload.sub, username: payload.username };
  }
}
