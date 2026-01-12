import "reflect-metadata";
import { container} from "tsyringe";

import { IUserService } from  "../../modules/auth/services/interfaces/IUserService.js"
import { UserService } from  "../../modules/auth/services/implementations/UserService.js"

import { IUserRepository } from  "../../modules/auth/repositories/interfaces/IUserRepository.js"
import { UserRepository } from  "../../modules/auth/repositories/implementations/UserRepository.js"
import { AuthController } from "../../modules/auth/controllers/user.controller.js";

container.registerSingleton<IUserService>("UserService", UserService);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton(AuthController)


export { container };