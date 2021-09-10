import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";

import { UserRepository } from "./models/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRole } from "./interfaces/user.interface";

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

  public async index() {
    const userRecords = await this.userRepository.find();

    if (!userRecords || userRecords.length < 1) {
      throw new NotFoundException("No user records found!");
    }

    return userRecords;
  }

  public async show(id: string) {
    const userRecord = await this.userRepository.findById(id);

    if (!userRecord) {
      throw new NotFoundException("No user record found!");
    }

    return userRecord;
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const userRecord = await this.userRepository.findById(id);

    if (!userRecord) {
      throw new NotFoundException("No user record found!");
    }

    const updatedUserObject = {
      email: updateUserDto.email || userRecord.email,
      password: updateUserDto.password || userRecord.password,
      username: updateUserDto.username || userRecord.username,
      fullName: updateUserDto.fullName || userRecord.fullName,
      avatar: updateUserDto.avatar || userRecord.avatar,
      birthday: updateUserDto.birthday || userRecord.birthday,
      biography: updateUserDto.biography || userRecord.biography,
      readingList: updateUserDto.newList
        ? [...userRecord.readingList, updateUserDto.newList]
        : [...userRecord.readingList],
      wishList: updateUserDto.newWish
        ? [...userRecord.wishList, updateUserDto.newWish]
        : [...userRecord.wishList],
    };

    return this.userRepository.findOneAndUpdate({ _id: id }, updatedUserObject);
  }

  public async remove(id: string) {
    const userRecord = await this.userRepository.findById(id);

    if (!userRecord) {
      throw new NotFoundException("No user record found!");
    }

    return {
      deleted: await this.userRepository.deleteOne({ _id: id }),
    };
  }
}
