import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { ConfigService } from "@/config/config.service";
import { UserRepository } from "@/user/models/user.repository";
import { Role, RoleType } from "./role.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthDto } from "./dto/auth.dto";
import { Profile } from "passport-google-oauth20";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private async storeUserRecordWithHash(email: string, hash: string, fullName: string) {
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

  private signUserToken(id: string, role: RoleType) {
    return this.jwtService.sign({
      sub: id,
      claim: role,
    });
  }

  public async loginWithGoogleProvider({
    emails,
    name,
    username,
    id,
    provider,
    photos,
  }: Profile) {
    let userRecord = await this.userRepository.findOne({
      email: emails?.[0].value,
    });

    if (!userRecord) {
      userRecord = await this.userRepository.create({
        provider,
        providerId: id,
        email: emails?.[0].value,
        password: id,
        fullName: `${name?.familyName} ${name?.givenName}`,
        username,
        avatar: photos?.[0].value,
        role: Role.READER,
        firstLogin: new Date(Date.now()),
        lastLogin: new Date(Date.now()),
        readingList: [],
        wishList: [],
      });
    }

    const { password, __v, ...userRecordWithoutPassword } = userRecord.toObject();

    return {
      access_token: this.signUserToken(userRecord.id, userRecord.role),
      user: userRecordWithoutPassword,
    };
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
      access_token: this.signUserToken(userRecord.id, userRecord.role),
      user: userRecordWithoutPassword,
    };
  }

  public async adminLogin(r: AuthDto) {
    const userRecord = await this.userRepository.findOne({ email: r.email });
    if (!userRecord) throw new NotFoundException("Record not found!");

    const userRole = (): string => userRecord.role;

    if (userRole() !== Role.SUPER_ADMIN || userRole() !== Role.ADMIN)
      throw new UnauthorizedException("You are not an admin!");

    const isPasswordValid = await argon2.verify(
      userRecord.password,
      r.password + this.configService.authOptions.pepper
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Incorrect email or password!");
    }

    const { password, __v, ...userRecordWithoutPassword } = userRecord.toObject();

    return {
      access_token: this.signUserToken(userRecord.id, userRecord.role),
      user: userRecordWithoutPassword,
    };
  }

  public async signUpWithEmailAndPassword({
    email,
    password: p,
    fullName,
    username,
  }: CreateUserDto) {
    const isEmailTaken = await this.userRepository.findOne({ email });

    if (isEmailTaken) {
      throw new ConflictException("Email address already in use!");
    }

    const hashedPassword = await argon2.hash(p + this.configService.authOptions.pepper);

    const userRecord = await this.storeUserRecordWithHash(
      email,
      hashedPassword,
      fullName,
      username
    );

    return {
      access_token: this.signUserToken(userRecord._id, userRecord.role),
      user: userRecord,
    };
  }
}
