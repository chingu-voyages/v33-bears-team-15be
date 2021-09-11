export enum Role {
  SUPER_ADMIN = "1",
  ADMIN = "2",
  READER = "3",
  PUBLISHER = "4",
  CRITIC = "5",
  AUTHOR = "6",
}

export type RoleType = `${Role}`;
