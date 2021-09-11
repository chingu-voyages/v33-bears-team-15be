import { IReadingList } from "./readingList.interface";

// TODO: `Book[]` when it's created
export interface IUser {
  email: string;
  username: string | null;
  password: string;
  fullName: string;
  avatar: string;
  birthday: Date | null;
  biography: string;
  role: UserRoleType;
  internalComment: string | null;
  firstLogin: Date;
  lastLogin: Date;
  readingList: IReadingList[];
  wishList: string[];
}

export enum UserRole {
  SUPER_ADMIN = "1",
  ADMIN = "2",
  READER = "3",
  PUBLISHER = "4",
  CRITIC = "5",
  AUTHOR = "6",
}

export type UserRoleType = `${UserRole}`;
