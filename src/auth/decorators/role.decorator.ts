import { SetMetadata } from "@nestjs/common";
import { Role } from "../role.enum";

export const ROLES_KEY = "claim";
export const UseRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
