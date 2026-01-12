import { inject, injectable } from "inversify";
import IHostProfileUseCase from "@/domain/interfaces/use_cases/IHostProfileUseCase";
import { Repositories } from "@/di/repositories";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";

@injectable()
export default class HostProfileUseCase implements IHostProfileUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async getProfile(id: string): Promise<any> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null; // Or throw an error if a user is expected to always exist
    }
    const { name, email, role } = user;
    return { name, email, role };
  }
}
