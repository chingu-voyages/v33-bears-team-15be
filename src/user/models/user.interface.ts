// TODO: Update `readinList` and `wishList` types
// to `ReadinList[]` and `Book[]` when they are created
export interface IUser {
  email: string;
  username: string | null;
  password: string;
  fullName: string;
  avatar: string;
  birthday: Date | null;
  biography: string;
  role: `${UserRole}`;
  internalComment: string | null;
  firstLogin: Date;
  lastLogin: Date;
  readingList: string[];
  wishList: string[];
}

export enum UserRole {
  SUPER_ADMIN,
  ADMIN,
  READER,
  PUBLISHER,
  CRITIC,
  AUTHOR,
}
