import { UpdateUserDTO } from "../../dto/update-user.dto.js";
import { CreateUserDTO } from "../../dto/create-user.dto.js";

export interface UserAuthPayload {
    id: string;
    role: 'user' | 'admin' | 'host';
    email: string;
}

export interface IUserService {
  register(dto: CreateUserDTO): Promise<any>;
  getProfile(userId: string): Promise<any>;
  updateProfile(userId: string, data: UpdateUserDTO): Promise<any>;
  login(email: string, password: string): Promise<{ token: string }>;
handleGoogleAuth(code: string): Promise<{ appToken: string, user: UserAuthPayload }>;
}
