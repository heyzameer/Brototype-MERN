import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { NotFoundError, UnauthorizedError, ForbiddenError } from "@/domain/entities/CustomErrors";
import { inject } from "inversify";
import { UserRole } from "@/types";
import { generateOtp } from "@/utils";
import { differenceInMinutes } from "date-fns";
import { OTP_EXPIRATION_MINUTES } from "@/config";
import IMailService from "@/domain/interfaces/services/IMailService";
import { IUserProfile } from "@/domain/entities/IUser";

interface Payload {
  email: string;
  otp: string;
}

export default class OtpUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Services.TokenService) private readonly tokenService: ITokenService,
    @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
    @inject(Repositories.OtpRepository) private readonly otpRepository: IOtpRepository,
    @inject(Services.MailService) private readonly mailService: IMailService,
  ) {}

  async exec({ email, otp }: Payload) {
    this.validatorService.validateRequiredFields({ email, otp });
    this.validatorService.validateEmailFormat(email);
    this.validatorService.validateOtpFormat(String(otp)); // Explicitly convert to string for validation

    const user = await this.userRepository.findByEmailWithCredentials(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.isBlocked) {
      throw new ForbiddenError("Your account has been blocked. Please contact support for assistance.");
    }

    if (user.isOAuthUser) {
      throw new UnauthorizedError("Please use your OAuth provider to sign in");
    }

    const otpDoc = await this.otpRepository.findByEmailAndOtp(email, Number(otp)); // Remove redundant Number() cast
    if (!otpDoc) {
      throw new UnauthorizedError("Invalid OTP");
    }

    const currentTime = new Date();
    const otpCreationTime = new Date(otpDoc.createdAt as string);
    const expirationTime = new Date(otpCreationTime.getTime() + OTP_EXPIRATION_MINUTES * 60 * 1000);

    if (currentTime > expirationTime) {
      await this.otpRepository.delete(otpDoc._id as string);
      throw new UnauthorizedError("OTP has expired");
    }

    await this.otpRepository.delete(otpDoc._id as string);

    const { accessToken, refreshToken } = this.tokenService.generateToken(user._id as string, UserRole.User);

    await this.userRepository.update(user._id!, { token: refreshToken });

    return { accessToken, refreshToken, user };
  }

  async resendOtp({ email }: { email: string }) {
    this.validatorService.validateRequiredFields({ email });
    this.validatorService.validateEmailFormat(email);

    const user = await this.userRepository.findByEmailWithCredentials(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.isBlocked) {
      throw new ForbiddenError("Your account has been blocked. Please contact support for assistance.");
    }

    if (user.isOAuthUser) {
      throw new UnauthorizedError("Please use your OAuth provider to sign in");
    }

    await this.otpRepository.deleteMany(email);

    const otp = generateOtp();
    await this.otpRepository.create(Number(otp), email);

    await this.mailService.sendOtpMail({
      email,
      name: user.name,
      otp,
    });
  }
}
