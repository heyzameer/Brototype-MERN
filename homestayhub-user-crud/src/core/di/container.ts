import "reflect-metadata";
import { container} from "tsyringe";

import { IUserService } from  "../../modules/user/services/interfaces/IUserService.js"
import { UserService } from  "../../modules/user/services/implementations/UserService.js"

import { IUserRepository } from  "../../modules/user/repositories/interfaces/IUserRepository.js"
import { UserRepository } from  "../../modules/user/repositories/implementations/UserRepository.js"
import { UserController } from "../../modules/user/controllers/user.controller.js";

container.registerSingleton<IUserService>("UserService", UserService);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton(UserController)


export { container };