

import { IUserService } from  "../../modules/user/services/interfaces/IUserService.js"
import { UserService } from  "../../modules/user/services/implementations/UserService.js"

import { IUserRepository } from  "../../modules/user/repositories/interfaces/IUserRepository.js"
import { UserRepository } from  "../../modules/user/repositories/implementations/UserRepository.js"
import { UserController } from "../../modules/user/controllers/user.controller.js";

class DIContainer {
  private static instance: DIContainer;
  private services = new Map<string, any>();

  private constructor() {
    this.services.set("UserRepository", new UserRepository());

    this.services.set(
      "UserService",
      new UserService(this.getRepository("UserRepository"))
    );
  
  }

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  public getRepository<T>(name: string): T {
    return this.services.get(name);
  }

  public getService<T>(name: string): T {
    return this.services.get(name);
  }
}

export const container = DIContainer.getInstance();
