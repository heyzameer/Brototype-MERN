import { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import { CreateUserDTO } from "../../dto/create-user.dto.js";
import { UpdateUserDTO } from "../../dto/update-user.dto.js";
import { hashPassword } from "../../../../core/utils/password.util.js";
import { AppError } from "../../../../core/errors/AppError.js";
import { IUserService } from "../interfaces/IUserService.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject('UserRepository') private UserRepository:IUserRepository 
){}

  async register(dto: CreateUserDTO) {
    const exists = await this.UserRepository.findByEmail(dto.email);
    if (exists) throw new AppError("Email already in use", 400);

    const passwordHash = dto.password 
      ? await hashPassword(dto.password) 
      : undefined;

    const user = await this.UserRepository.create({
      ...dto,
      passwordHash,
      roles: ["user"],
    });

    // remove sensitive data
    delete (user as any).passwordHash;

    return user;
  }

  async getProfile(id: string) {
  //   const user = await this.repo.findById(id);
  //   if (!user) throw new AppError("User not found", 404);

  //   delete (user as any).passwordHash;

  //   return user;
  }

  async updateProfile(id: string, dto: UpdateUserDTO) {
  //   if (dto.password) {
  //     dto.passwordHash = await hashPassword(dto.password);
  //     delete dto.password;
    // }

  //   const updated = await this.repo.update(id, dto);
  //   if (!updated) throw new AppError("User not found", 404);

  //   delete (updated as any).passwordHash;

  //   return updated;
  }
}
