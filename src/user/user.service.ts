import { ConflictException, Injectable } from "@nestjs/common";

import { UserRepository } from "./models/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRole } from "./models/user.interface";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * @TODO Implement password hashing and authorization
   */
  public async create({ email, password, fullName }: CreateUserDto) {
    const isEmailTaken = await this.userRepository.findOne({ email });

    if (isEmailTaken) {
      throw new ConflictException("Email address already in use!");
    }

    const user = await this.userRepository.create({
      email,
      password,
      fullName,
      role: UserRole.READER,
      firstLogin: new Date(Date.now()),
      lastLogin: new Date(Date.now()),
      readingList: [],
      wishList: [],
    });

    return user;
  }

  public index() {
    return `This action returns all user`;
  }

  public find(id: number) {
    return `This action returns a #${id} user`;
  }

  public update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
