import container from "./container";
import ValidatorService from "@/infrastructure/services/ValidatorService";
import TokenService from "@/infrastructure/services/TokenService";
import MailService from "@/infrastructure/services/MailService";
import HashService from "@/infrastructure/services/HashService";
import OAuthService from "@/infrastructure/services/OAuthService";
import { TYPES } from "./types";

export enum Services {
  TokenService = "TokenService",
  ValidatorService = "ValidatorService",
  MailService = "MailService",
  HashService = "HashService",
  OAuthService = "OAuthService",
}

container.bind(Services.ValidatorService).to(ValidatorService).inSingletonScope();
container.bind(Services.TokenService).to(TokenService).inSingletonScope();
container.bind(Services.MailService).to(MailService).inSingletonScope();
container.bind(Services.HashService).to(HashService).inSingletonScope();
container.bind(Services.OAuthService).to(OAuthService).inSingletonScope();

// Bind interfaces to implementations
container.bind(TYPES.IValidatorService).to(ValidatorService).inSingletonScope();
container.bind(TYPES.ITokenService).to(TokenService).inSingletonScope();
container.bind(TYPES.IMailService).to(MailService).inSingletonScope();
container.bind(TYPES.IHashService).to(HashService).inSingletonScope();
container.bind(TYPES.IOAuthService).to(OAuthService).inSingletonScope();
