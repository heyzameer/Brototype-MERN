export const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  IOtpRepository: Symbol.for("IOtpRepository"),
  IListingRepository: Symbol.for("IListingRepository"),

  // Services
  IHashService: Symbol.for("IHashService"),
  ITokenService: Symbol.for("ITokenService"),
  IValidatorService: Symbol.for("IValidatorService"),
  IMailService: Symbol.for("IMailService"),
  IOAuthService: Symbol.for("IOAuthService"),

  // Use Cases
  VerifyHostUseCase: Symbol.for("VerifyHostUseCase"),
};
