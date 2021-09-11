import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { ConfigService } from "@/config/config.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "@/user/models/user.repository";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserEntity, UserEntitySchema } from "@/user/models/user.entity";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.authOptions.jwtSecretKey,
        signOptions: {
          expiresIn: config.authOptions.verificationTokenDuration,
        },
      }),
    }),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }]),
  ],
  providers: [AuthService, UserRepository, ConfigService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
