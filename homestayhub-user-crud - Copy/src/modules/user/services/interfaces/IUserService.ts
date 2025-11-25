import { UpdateUserDTO } from "../../dto/update-user.dto.js";
import { CreateUserDTO } from "../../dto/create-user.dto.js";

export interface IUserService {
  register(dto: CreateUserDTO): Promise<any>;
  getProfile(userId: string): Promise<any>;
  updateProfile(userId: string, data: UpdateUserDTO): Promise<any>;
}
