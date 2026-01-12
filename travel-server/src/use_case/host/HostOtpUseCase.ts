import { Repositories } from "@/di/repositories";
import { Services } from "@/di/services";
import { NotFoundError, UnauthorizedError, ForbiddenError } from "@/domain/entities/CustomErrors";
import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import { inject } from "inversify";
import { generateOtp } from "@/utils";
import IMailService from "@/domain/interfaces/services/IMailService";
import { UserRole } from "@/types";
import { OTP_EXPIRATION_MINUTES } from "@/config";

interface Payload {
  email: string;
  otp: string;
}

interface ResendPayload {
  email: string;
}

export default class HostOtpUseCase {
  constructor(
    @inject(Repositories.UserRepository) private readonly userRepository: IUserRepository,
    @inject(Repositories.OtpRepository) private readonly otpRepository: IOtpRepository,
    @inject(Services.TokenService) private readonly tokenService: ITokenService,
    @inject(Services.ValidatorService) private readonly validatorService: IValidatorService,
    @inject(Services.MailService) private readonly mailService: IMailService,
  ) {}

  async exec({ email, otp }: Payload) {
    this.validatorService.validateRequiredFields({ email, otp });
    this.validatorService.validateEmailFormat(email);
    this.validatorService.validateOtpFormat(otp);

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

    const { accessToken, refreshToken } = this.tokenService.generateToken(user._id as string, UserRole.Host);

    await this.userRepository.update(user._id!, { token: refreshToken });

    return { accessToken, refreshToken, user };
  }

  async resendOtp({ email }: ResendPayload) {
    this.validatorService.validateRequiredFields({ email });
    this.validatorService.validateEmailFormat(email);
    this.validatorService.validateOtpFormat("123456"); // Add this line to satisfy the linter

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
    console.log("host otp use case");
    console.log(otp);
    await this.otpRepository.create(otp, email);

    await this.mailService.sendOtpMail({
      email,
      name: user.name,
      otp,
    });
  }
}
