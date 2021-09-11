import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";

import { ConfigService } from "@/config/config.service";
import { UserRepository } from "@/user/models/user.repository";
import { Role, RoleType } from "./role.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private signUser(id: string, role: RoleType) {
    return this.jwtService.sign({
      sub: id,
      claim: role,
    });
  }

  private async storeUserRecord(email: string, hash: string, fullName: string) {
    const userRecord = await this.userRepository.create({
      email,
      password: hash,
      fullName,
      role: Role.READER,
      firstLogin: new Date(Date.now()),
      lastLogin: new Date(Date.now()),
      readingList: [],
      wishList: [],
    });

    const { password, __v, ...userRecordWithoutPassword } = userRecord.toObject();

    return userRecordWithoutPassword;
  }

  public async loginWithEmailAndPassword(r: AuthDto) {
    const userRecord = await this.userRepository.findOne({ email: r.email });

    if (!userRecord) {
      throw new UnauthorizedException("Incorrect email or password!");
    }

    const isPasswordValid = await argon2.verify(
      userRecord.password,
      r.password + this.configService.authOptions.pepper
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Incorrect email or password!");
    }

    const { password, __v, ...userRecordWithoutPassword } = userRecord.toObject();

    return {
      access_token: this.signUser(userRecord.id, userRecord.role),
      user: userRecordWithoutPassword,
    };
  }

  public async signUpWithEmailAndPassword({
    email,
    password: p,
    fullName,
  }: CreateUserDto) {
    const isEmailTaken = await this.userRepository.findOne({ email });

    if (isEmailTaken) {
      throw new ConflictException("Email address already in use!");
    }

    const hashedPassword = await argon2.hash(p + this.configService.authOptions.pepper);

    const userRecord = await this.storeUserRecord(email, hashedPassword, fullName);

    return {
      access_token: this.signUser(userRecord._id, userRecord.role),
      user: userRecord,
    };
  }
}
