import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import { NotFoundError, UnauthorizedError, ConflictError, ForbiddenError } from "@/domain/entities/CustomErrors";
import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IHashService from "@/domain/interfaces/services/IHashService";
import IMailService from "@/domain/interfaces/services/IMailService";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { inject } from "inversify";
import { generateOtp } from "@/utils";
import { UserRole } from "@/types";
import { OTP_EXPIRATION_MINUTES, RESET_LINK_EXPIRATION_MINUTES, CLIENT_URL } from "@/config";

interface ForgotPasswordPayload {
  email: string;
}

interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
}

export default class HostResetPasswordUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Repositories.OtpRepository) private readonly otpRepository: IOtpRepository,
    @inject(Services.HashService) private readonly hashService: IHashService,
    @inject(Services.MailService) private readonly mailService: IMailService,
    @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
    @inject(Services.TokenService) private readonly tokenService: ITokenService,
  ) {}

  async forgotPassword({ email }: ForgotPasswordPayload) {
    console.log("host forgot password use case");
    console.log(email);
    this.validatorService.validateRequiredFields({ email });
    this.validatorService.validateEmailFormat(email);

    const user = await this.userRepository.findByEmailWithCredentials(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.isBlocked) {
      throw new ForbiddenError("Your account has been blocked. Please contact support for assistance.");
    }

    if (user.role !== UserRole.Host) {
      throw new UnauthorizedError("User is not a Host");
    }

    await this.otpRepository.deleteMany(email);

    const otp = generateOtp();
    console.log("host forgot password use case");
    console.log(otp);
    await this.otpRepository.create(otp, email);

    const createdDate = new Date().toISOString();
    const resetLink = `${CLIENT_URL}/host/auth/reset-password/?token=${otp}X_X${encodeURIComponent(createdDate)}`;

    console.log("host forgot password use case");
    console.log(resetLink);
    await this.mailService.sendPasswordResetLink({
      email,
      name: user.name,
      resetLink,
    });
  }

  async exec({ email, otp, password }: ResetPasswordPayload) {
    console.log("host reset password use case");
    console.log(email);
    console.log(otp);
    console.log(password);
    this.validatorService.validateRequiredFields({ email, otp, password });
    this.validatorService.validateEmailFormat(email);
    this.validatorService.validatePassword(password);

    const user = await this.userRepository.findByEmailWithCredentials(email);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.isBlocked) {
      throw new ForbiddenError("Your account has been blocked. Please contact support for assistance.");
    }

    if (user.role !== UserRole.Host) {
      throw new UnauthorizedError("User is not a Host");
    }

    const otpDoc = await this.otpRepository.findByEmailAndOtp(email, Number(otp));
    if (!otpDoc) {
      throw new UnauthorizedError("Invalid OTP or reset link.");
    }

    const currentTime = new Date();
    const otpCreationTime = new Date(otpDoc.createdAt as string);
    const expirationTime = new Date(otpCreationTime.getTime() + RESET_LINK_EXPIRATION_MINUTES * 60 * 1000);

    if (currentTime > expirationTime) {
      await this.otpRepository.delete(otpDoc._id as string);
      throw new UnauthorizedError("Reset link has expired.");
    }

    await this.otpRepository.delete(otpDoc._id as string);

    const hashedPassword = await this.hashService.hash(password);
    await this.userRepository.update(user._id!, { password: hashedPassword });

    await this.tokenService.clearRefreshToken(user.email);

    return { success: true };
  }
}
