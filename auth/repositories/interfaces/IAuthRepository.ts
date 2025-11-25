import { IUser } from "../../../user/model/user.model.js";

export interface IAuthRepository {
  findUserByEmail(email: string): Promise<IUser | null>;
  createUser(user: Partial<IUser>): Promise<IUser>;
  saveRefreshToken(userId: string, tokenHash: string): Promise<void>;
  findRefreshToken(userId: string, tokenHash: string): Promise<boolean>;
  revokeRefreshToken(userId: string): Promise<void>;
}
