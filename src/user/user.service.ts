import { Injectable, NotFoundException } from "@nestjs/common";

import { UserRepository } from "./models/user.repository";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateReadingListDto } from "./dto/readingList-create.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
      wishList: updateUserDto.newWish
        ? [...userRecord.wishList, updateUserDto.newWish]
        : [...userRecord.wishList],
    };

    return this.userRepository.findByIdAndUpdate(id, updatedUserObject);
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

  public async createList(id: string, createReadingListDto: CreateReadingListDto) {
    const userRecord = await this.userRepository.findById(id);

    if (!userRecord) {
      throw new NotFoundException("No user record found!");
    }

    const updatedUserObject = {
      readingList: [...userRecord.readingList, createReadingListDto],
    };

    return this.userRepository.findByIdAndUpdate(id, updatedUserObject);
  }
}
