import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import IOAuthService from "@/domain/interfaces/services/IOAuthService";
import { UnauthorizedError } from "@/domain/entities/CustomErrors";
import { inject } from "inversify";
import { UserRole } from "@/types";
import IUser, { IUserProfile } from "@/domain/entities/IUser";
import IHashService from "@/domain/interfaces/services/IHashService";

interface OAuthPayload {
  name: string;
  email: string;
  accessToken: string;
  profile: string | null;
}

export default class HostOAuthUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Services.TokenService) private readonly tokenService: ITokenService,
    @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
    @inject(Services.OAuthService) private readonly oAuthService: IOAuthService,
    @inject(Services.HashService) private readonly hashService: IHashService,
  ) {}

  async exec({ name, email, accessToken, profile }: OAuthPayload) {
    this.validatorService.validateRequiredFields({ name, email, accessToken });
    this.validatorService.validateEmailFormat(email);

    const firebaseUser = await this.oAuthService.verifyAccessToken(accessToken);

    if (!firebaseUser || firebaseUser.email !== email) {
      throw new UnauthorizedError("Invalid Firebase token");
    }

    let user = await this.userRepository.findByEmailWithCredentials(email);

    if (!user) {
      const hashedPassword = await this.hashService.hash(email);
      user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        isOAuthUser: true,
        profile: profile!,
        role: UserRole.Host,
      });
    }

    if (user.isBlocked) {
      throw new UnauthorizedError("Your account has been blocked. Please contact support for assistance.");
    }

    if (user.role !== UserRole.Host) {
      throw new UnauthorizedError("User is not a Host");
    }

    const { accessToken: jwtAccessToken, refreshToken } = await this.createTokens(user as IUser);

    return {
      accessToken: jwtAccessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
    };
  }

  private async createTokens(user: IUser) {
    const accessToken = this.tokenService.createAccessToken({
      email: user.email,
      id: user._id!.toString(),
      role: UserRole.Host,
    });

    const refreshToken = this.tokenService.createRefreshToken({
      email: user.email,
      id: user._id!.toString(),
    });

    await this.userRepository.update(user._id!, { token: refreshToken });

    return { accessToken, refreshToken };
  }
}
