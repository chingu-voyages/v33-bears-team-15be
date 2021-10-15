import { Injectable, NotFoundException } from "@nestjs/common";

import { UserRepository } from "./models/user.repository";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateReadingListDto } from "./dto/readingList-create.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * @TODO
   * We need a better way to serialize this fn, the
   * way we did it rn, it will require us to loop over
   * the whole array and remove properties from the user obj
   * which at a high amout of users is possible for a get query.
   *
   * This fn is only available for admin/super-admin roles,
   * for now it's good, but needs to be done asap after the MVP
   */
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

    const { password, __v, firstLogin, lastLogin, internalComment, ...restUserRecord } =
      userRecord.toObject();

    return restUserRecord;
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const userRecord = await this.userRepository.findById(id);

    if (!userRecord) {
      throw new NotFoundException("No user record found!");
    }

    const updatedUserObject = {
      ...updateUserDto,
      wishList: updateUserDto.newWish
        ? [...userRecord.wishList, updateUserDto.newWish]
        : [...userRecord.wishList],
    };

    const updatedUserRecord = await this.userRepository.findByIdAndUpdate(
      id,
      updatedUserObject
    );

    const { password, __v, firstLogin, lastLogin, internalComment, ...restUserRecord } =
      updatedUserRecord.toObject();

    return restUserRecord;
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
