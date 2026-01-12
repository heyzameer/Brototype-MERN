import IUser, { UserProfilePromise, UserPromise } from "@/domain/entities/IUser";
import IBaseRepository from "./IBaseRepository";

export default interface IUserRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): UserPromise;
  findById(id: string): UserPromise;

  findByIdWithCredentials(id: string): UserPromise;
  findByEmailWithCredentials(email: string): UserPromise;
  findByEmailForAuth(email: string): Promise<IUser | null>;
}
