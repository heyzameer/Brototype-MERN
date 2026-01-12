import { IUser } from "../../model/user.model.js";

export interface IUserRepository {
  create(data: Partial<IUser>): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  update(id: string, data: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<IUser | null>;
}
