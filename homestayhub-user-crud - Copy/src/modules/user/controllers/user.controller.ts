import { Request, Response, NextFunction } from "express";
import { container } from "../../../core/di/container.js";
import { IUserService } from "../services/interfaces/IUserService.js";
import { RegisterUserDTO } from "../dto/register-user.dto.js";
// import { CustomError } from "../../../core/errors/error.middleware.js"; // Assuming you need a custom error type

/**
 * Note: When using a class for the controller, we recommend 
 * removing the immediate instantiation and letting the router handle it.
 */
export class UserController {
private userService:IUserService
  
  constructor(){
  this.userService = container.getService<IUserService>("UserService");
  }
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Register endpoint hit");
      const userData: RegisterUserDTO = req.body;

      const newUser = await this.userService.register(userData);
      return res.status(201).json({
        success: true,
        data: newUser,
      });
    } catch (err) {
      console.error("Error in register controller:", err);
    }
  };

  public getProfile = async (req: Request, res: Response, next: NextFunction) => {
    // try {
    //   const userId = req.user.id;
    //   const profile = await this.userService.getProfile(userId);

    //   return res.json({
    //     success: true,
    //     data: profile,
    //   });
    // } catch (err) {
    //   next(err);
    // }
  };

  public updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    // try {
    //   const userId = req.user.id;
    //   const updatedUser = await this.userService.updateProfile(userId, req.body);

    //   return res.json({
    //     success: true,
    //     data: updatedUser,
    //   });
    // } catch (err) {
    //   next(err);
    // }
  };
}

// REMOVE: export const userController = new UserController();
// The instance will now be created in the routes file.