import { ConfigService } from "@/config/config.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(readonly configService: ConfigService) {
    super({
      secretOrKey: configService.authOptions.jwtSecretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      expiresIn: configService.authOptions.verificationTokenDuration,
    });
  }

  public async validate(payload: any) {
    return payload;
  }
}
