import { UserRoleType } from "@/auth/interfaces/role.interface";
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
