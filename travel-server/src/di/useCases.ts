import container from "./container";
import SigninUseCase from "@/use_case/user/auth/SigninUseCase";
import SignupUseCase from "@/use_case/user/auth/SignupUseCase";
import OtpUseCase from "@/use_case/user/auth/OtpUseCase";
import ResetPasswordUseCase from "@/use_case/user/auth/ResetPasswordUseCase";
import GetProfileUseCase from "@/use_case/user/GetProfileUseCase";
import AdminSigninUseCase from "@/use_case/admin/SigninUseCase";
import GetUsersUseCase from "@/use_case/admin/GetUsersUseCase";
import OAuthUseCase from "@/use_case/user/auth/OAuthUseCase";
import UpdateProfileUseCase from "@/use_case/user/UpdateProfileUseCase";
import UpdateUserUseCase from "@/use_case/admin/UpdateUserUseCase";
import { Repositories } from "./repositories";
import { Services } from "./services";
import ITokenService from "@/domain/interfaces/services/ITokenService";
import IUserRepository from "@/domain/interfaces/repositories/IUserRepository";
import IHashService from "@/domain/interfaces/services/IHashService";
import IValidatorService from "@/domain/interfaces/services/IValidatorService";
import IOAuthService from "@/domain/interfaces/services/IOAuthService";
import CreateListingUseCase from "@/use_case/host/CreateListingUseCase";
import GetListingsUseCase from "@/use_case/host/GetListingsUseCase";
import UpdateListingUseCase from "@/use_case/host/UpdateListingUseCase";
import DeleteListingUseCase from "@/use_case/host/DeleteListingUseCase";
import IListingRepository from "@/domain/interfaces/repositories/IListingRepository";
import HostSignupUseCase from "@/use_case/host/HostSignupUseCase";
import HostSigninUseCase from "@/use_case/host/HostSigninUseCase";
import HostOtpUseCase from "@/use_case/host/HostOtpUseCase";
import HostResetPasswordUseCase from "@/use_case/host/HostResetPasswordUseCase";
import HostOAuthUseCase from "@/use_case/host/HostOAuthUseCase";
import HostProfileUseCase from "@/use_case/host/HostProfileUseCase";
import IOtpRepository from "@/domain/interfaces/repositories/IOtpRepository";
import IMailService from "@/domain/interfaces/services/IMailService";
import VerifyHostUseCase from "@/use_case/host/VerifyHostUseCase";

export enum UseCases {
  SigninUseCase = "SigninUseCase",
  SignupUseCase = "SignupUseCase",
  LogoutUseCase = "LogoutUseCase",
  OtpUseCase = "OtpUseCase",
  ResetPasswordUseCase = "ResetPasswordUseCase",
  OAuthUseCase = "OAuthUseCase",

  GetProfileUseCase = "GetProfileUseCase",
  UpdateProfileUseCase = "UpdateProfileUseCase",

  AdminSigninUseCase = "AdminSigninUseCase",
  GetUsersUseCase = "GetUsersUseCase",
  UpdateUserUseCase = "UpdateUserUseCase",

  CreateListingUseCase = "CreateListingUseCase",
  GetListingsUseCase = "GetListingsUseCase",
  UpdateListingUseCase = "UpdateListingUseCase",
  DeleteListingUseCase = "DeleteListingUseCase",

  HostSignupUseCase = "HostSignupUseCase",
  HostSigninUseCase = "HostSigninUseCase",
  HostOtpUseCase = "HostOtpUseCase",
  HostResetPasswordUseCase = "HostResetPasswordUseCase",
  HostOAuthUseCase = "HostOAuthUseCase",
  HostProfileUseCase = "HostProfileUseCase",

  VerifyHostUseCase = "VerifyHostUseCase",
}

container.bind(UseCases.SigninUseCase).to(SigninUseCase);
container.bind(UseCases.SignupUseCase).to(SignupUseCase);
container.bind(UseCases.OtpUseCase).to(OtpUseCase);
container.bind(UseCases.ResetPasswordUseCase).to(ResetPasswordUseCase);
container
  .bind<OAuthUseCase>(UseCases.OAuthUseCase)
  .toDynamicValue((context) => {
    return new OAuthUseCase(
      context.get<IUserRepository>(Repositories.UserRepository),
      context.get<ITokenService>(Services.TokenService),
      context.get<IValidatorService>(Services.ValidatorService),
      context.get<IOAuthService>(Services.OAuthService),
      context.get<IHashService>(Services.HashService)
    );
  })
  .inSingletonScope();

container.bind(UseCases.GetProfileUseCase).to(GetProfileUseCase);
container.bind(UseCases.UpdateProfileUseCase).to(UpdateProfileUseCase);

// admin
container
  .bind<AdminSigninUseCase>(UseCases.AdminSigninUseCase)
  .toDynamicValue((context) => {
    return new AdminSigninUseCase(
      context.get<ITokenService>(Services.TokenService),
      context.get<IUserRepository>(Repositories.UserRepository),
      context.get<IHashService>(Services.HashService)
    );
  })
  .inSingletonScope();
container.bind(UseCases.GetUsersUseCase).to(GetUsersUseCase);
container.bind(UseCases.UpdateUserUseCase).to(UpdateUserUseCase);

// host
container
  .bind<CreateListingUseCase>(UseCases.CreateListingUseCase)
  .toDynamicValue((context) => {
    return new CreateListingUseCase(
      context.get<IUserRepository>(Repositories.UserRepository),
      context.get<IListingRepository>(Repositories.ListingRepository)
    );
  })
  .inSingletonScope();
container
  .bind<GetListingsUseCase>(UseCases.GetListingsUseCase)
  .toDynamicValue((context) => {
    return new GetListingsUseCase(
      context.get<IListingRepository>(Repositories.ListingRepository)
    );
  })
  .inSingletonScope();
container
  .bind<UpdateListingUseCase>(UseCases.UpdateListingUseCase)
  .toDynamicValue((context) => {
    return new UpdateListingUseCase(
      context.get<IListingRepository>(Repositories.ListingRepository)
    );
  })
  .inSingletonScope();
container
  .bind<DeleteListingUseCase>(UseCases.DeleteListingUseCase)
  .toDynamicValue((context) => {
    return new DeleteListingUseCase(
      context.get<IListingRepository>(Repositories.ListingRepository)
    );
  })
  .inSingletonScope();

container.bind(UseCases.HostSignupUseCase).to(HostSignupUseCase).inSingletonScope();

container
  .bind<HostSigninUseCase>(UseCases.HostSigninUseCase)
  .toDynamicValue((context) => {
    return new HostSigninUseCase(
      context.get<IUserRepository>(Repositories.UserRepository),
      context.get<IValidatorService>(Services.ValidatorService),
      context.get<IOtpRepository>(Repositories.OtpRepository),
      context.get<IMailService>(Services.MailService),
      context.get<IHashService>(Services.HashService),
      context.get<ITokenService>(Services.TokenService)
    );
  })
  .inSingletonScope();

container
  .bind<HostOtpUseCase>(UseCases.HostOtpUseCase)
  .toDynamicValue((context) => {
    return new HostOtpUseCase(
      context.get<IUserRepository>(Repositories.UserRepository),
      context.get<IOtpRepository>(Repositories.OtpRepository),
      context.get<ITokenService>(Services.TokenService),
      context.get<IValidatorService>(Services.ValidatorService),
      context.get<IMailService>(Services.MailService)
    );
  })
  .inSingletonScope();

container
  .bind<HostResetPasswordUseCase>(UseCases.HostResetPasswordUseCase)
  .toDynamicValue((context) => {
    return new HostResetPasswordUseCase(
      context.get<IUserRepository>(Repositories.UserRepository),
      context.get<IOtpRepository>(Repositories.OtpRepository),
      context.get<IHashService>(Services.HashService),
      context.get<IMailService>(Services.MailService),
      context.get<IValidatorService>(Services.ValidatorService),
      context.get<ITokenService>(Services.TokenService)
    );
  })
  .inSingletonScope();

container
  .bind<HostOAuthUseCase>(UseCases.HostOAuthUseCase)
  .toDynamicValue((context) => {
    return new HostOAuthUseCase(
      context.get<IUserRepository>(Repositories.UserRepository),
      context.get<ITokenService>(Services.TokenService),
      context.get<IValidatorService>(Services.ValidatorService),
      context.get<IOAuthService>(Services.OAuthService),
      context.get<IHashService>(Services.HashService)
    );
  })
  .inSingletonScope();

  container
  .bind<VerifyHostUseCase>(UseCases.VerifyHostUseCase)
  .to(VerifyHostUseCase)
  .inSingletonScope();

container.bind(UseCases.HostProfileUseCase).to(HostProfileUseCase).inSingletonScope();
