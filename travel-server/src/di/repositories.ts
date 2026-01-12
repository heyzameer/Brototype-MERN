import container from "./container";
import UserRepository from "@/infrastructure/repositories/UserRepository";
import OtpRepository from "@/infrastructure/repositories/OtpRepository";
import ListingRepository from "@/infrastructure/repositories/ListingRepository";
import { TYPES } from "./types";

export enum Repositories {
  UserRepository = "UserRepository",
  OtpRepository = "OtpRepository",
  ListingRepository = "ListingRepository",
}

container.bind(Repositories.UserRepository).to(UserRepository).inSingletonScope();
container.bind(Repositories.OtpRepository).to(OtpRepository).inSingletonScope();
container.bind(Repositories.ListingRepository).to(ListingRepository).inSingletonScope();

// Bind interfaces to implementations
container.bind(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
container.bind(TYPES.IOtpRepository).to(OtpRepository).inSingletonScope();
container.bind(TYPES.IListingRepository).to(ListingRepository).inSingletonScope();
