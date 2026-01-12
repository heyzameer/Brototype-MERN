import { Services } from "@/di/services";
import { ForbiddenError, UnauthorizedError } from "@/domain/entities/CustomErrors";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import { UserRole } from "@/types";
import { inject } from "inversify";
import { Repositories } from "@/di/repositories";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IHashService from "@/domain/interfaces/services/IHashService";

// TODO: Need Store the admin details in db

interface Payload {
  email: string;
  password: string;
}

export default class AdminSigninUseCase {
  constructor(
    @inject(Services.TokenService) private readonly tokenService: ITokenService,
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Services.HashService) private readonly hashService: IHashService,
  ) {}
  async exec({ email, password }: Payload) {
    const adminUser = await this.userRepository.findByEmailWithCredentials(email);
    if (!adminUser || adminUser.role !== UserRole.Admin) {
      throw new UnauthorizedError("Invalid email or password provided");
    }
    if (!adminUser.password) {
      throw new UnauthorizedError("Admin user found but no password set.");
    }
    const isPasswordValid = await this.hashService.compare(password, adminUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password provided");
    }

    if (!adminUser._id) {
      throw new Error("Admin user ID is missing after database retrieval.");
    }

    const { accessToken, refreshToken } = this.createToken(adminUser.email, adminUser._id);

    return { accessToken, refreshToken };
  }

  private createToken(email: string, id: string) {
    const accessToken = this.tokenService.createAccessToken({
      email,
      id,
      role: UserRole.Admin,
    });

    const refreshToken = this.tokenService.createRefreshToken({
      email,
      id: email,
    });

    return { refreshToken, accessToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    if (!refreshToken) {
      throw new ForbiddenError("Unauthenticated");
    }
    const { id, email } = this.tokenService.verifyRefreshToken(refreshToken);

    const accessToken = this.tokenService.createAccessToken({ email, id, role: UserRole.Admin });

    return { accessToken };
  }
}
