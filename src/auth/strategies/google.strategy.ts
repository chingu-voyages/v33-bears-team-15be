import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-google-oauth20";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@/config/config.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(readonly configService: ConfigService) {
    super({
      clientID: configService.authOptions.googleClientId,
      clientSecret: configService.authOptions.googleClientSecret,
      callbackURL: `${configService.apiOptions.hostname}/${configService.apiOptions.prefix}/v1/auth/google/redirect`,
      scope: ["email", "profile"],
    });
  }

  public async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ): Promise<Profile> {
    return profile;
  }
}
