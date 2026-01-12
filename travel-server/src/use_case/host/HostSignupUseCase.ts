// src/use_case/host/HostSignupUseCase.ts

import { inject, injectable } from "inversify";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IHashService from "@/domain/interfaces/services/IHashService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import IMailService from "@/domain/interfaces/services/IMailService";
import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";
import { UserRole, VerificationStatus } from "@/types";
import { TYPES } from "@/di/types";
import { generateOtp } from "@/utils";

@injectable()
export default class HostSignupUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
    @inject(TYPES.IHashService) private hashService: IHashService,
    @inject(TYPES.IValidatorService) private validatorService: IValidatorService,
    @inject(TYPES.IMailService) private mailService: IMailService,
    @inject(TYPES.IOtpRepository) private otpRepo: IOtpRepository,
  ) {}

  async exec(dto: { name: string; email: string; password: string }) {
    const { name, email, password } = dto;

    // Basic validation
    if (!name?.trim()) throw new Error("Name is required");
    if (!email?.trim()) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    // Check if user already exists
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new Error("User already exists");

    // Validate email format
    if (!this.validatorService.validateEmailFormat(email)) {
      throw new Error("Invalid email format");
    }

    // Hash password
    const hashedPassword = await this.hashService.hash(password);

    // Create user
    const user = await this.userRepo.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: UserRole.Host,
      isVerified: false,
      verificationStatus: VerificationStatus.Pending,
    });

    // Generate OTP
    const otp = generateOtp();
    const hashedOtp = await this.hashService.hash(otp.toString());

    // Save OTP
    await this.otpRepo.create(otp, user.email);

    // Send verification email
    await this.mailService.sendOtpMail({
      email: user.email,
      name: user.name,
      otp: otp,
    });

    return {
      message: "Host account created successfully. Please check your email for verification code.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}