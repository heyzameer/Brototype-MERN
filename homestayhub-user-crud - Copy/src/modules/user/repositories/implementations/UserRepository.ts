import { IUserRepository } from "../interfaces/IUserRepository.js";
import { UserModel, IUser } from "../../model/user.model.js";
import { UpdateUserDTO } from "../../dto/update-user.dto.js";
import { injectable } from "tsyringe";
import { BaseRepository } from "./baseRepository.js";

@injectable()
export class UserRepository extends BaseRepository<IUser> implements IUserRepository {

  constructor(){
    super(UserModel);
  }
  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email
  }).lean<IUser>().exec();
  }
}
