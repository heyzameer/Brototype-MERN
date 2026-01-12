import { IUserRepository } from "../../repositories/interfaces/IUserRepository.js";
import { CreateUserDTO } from "../../dto/create-user.dto.js";
import { UpdateUserDTO } from "../../dto/update-user.dto.js";
import { hashPassword, comparePassword } from "../../../../core/utils/password.util.js";
import { AppError } from "../../../../core/errors/AppError.js";
import { IUserService } from "../interfaces/IUserService.js";
import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";
import { UserAuthPayload } from "../interfaces/IUserService.js";
import axios from 'axios';
import { IUser } from "../../model/user.model.js"; // Assuming you import IUser here

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject('UserRepository') private UserRepository: IUserRepository
  ) { }
/**
 * 
 * @param payload 
 * @returns 
 */
  private generateAppToken(payload: { id: string, email: string, roles: string[] }): string {
    return jwt.sign(
      { userId: payload.id, email: payload.email, roles: payload.roles },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
  }

  // --- Existing Methods ---

  async register(dto: CreateUserDTO) {
    // ... (existing register logic)
    const exists = await this.UserRepository.findByEmail(dto.email);
    if (exists) {
      throw new AppError("Email already in use", 400);
    }

    const passwordHash = dto.password
      ? await hashPassword(dto.password)
      : undefined;

    const user = await this.UserRepository.create({
      ...dto,
      passwordHash,
      roles: ["user"],
    });

    // remove sensitive data
    delete (user as any).passwordHash;
    return user;
  }

  async login(email: string, password: string) {
    const user: IUser | null = await this.UserRepository.findByEmail(email);
    if (!user) throw new AppError("Invalid email or password", 401);

    if (!user.passwordHash) throw new AppError("Invalid email or password", 401);

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) throw new AppError("Invalid email or password", 401);

    // --- FIXES IN LOGIN METHOD ---
    if (!user._id) {
      throw new AppError("User ID missing from retrieved user object.", 500);
    }
    const userRoles: string[] = user.roles || ['user']; // Default role if roles is undefined

    const token = this.generateAppToken({
      id: user._id.toString(), // _id is now checked
      email: user.email,
      roles: userRoles         // roles is now guaranteed string[]
    });
    // --- END FIXES IN LOGIN METHOD ---

    return { token };
  }

  // --- Google Auth Method ---

  public async handleGoogleAuth(code: string): Promise<{ appToken: string, user: UserAuthPayload }> {
    // ... (Environment Variable and Token Exchange Checks)
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
      throw new Error('Google Auth environment variables are not set.');
    }

    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: GOOGLE_REDIRECT_URI,
    });

    const idToken = tokenResponse.data.id_token;
    const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());

    const googleUserData = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name || '',
      verified: payload.email_verified,
    };

    let user: IUser | null = await this.UserRepository.findByEmail(googleUserData.email);

    if (!user) {
      const newUserData: CreateUserDTO = {
        email: googleUserData.email,
        name: googleUserData.name,
        googleId: googleUserData.googleId,
        roles: ["user"],
      };
      user = await this.UserRepository.create(newUserData);
    } else if (!user.googleId) {
      // Update assumes the user object returned from update has a valid _id and roles
      user = await this.UserRepository.update(user._id!.toString(), { // Use non-null assertion or check
        googleId: googleUserData.googleId
      });
    }

    // --- FIXES IN HANDLEGOOGLEAUTH METHOD ---

    // 1. Check for missing ID (Critical check for user object)
    if (!user || !user._id) {
      throw new AppError("Failed to retrieve user ID during Google Auth process.", 500);
    }

    // 2. Resolve 'roles' type error
    const userRoles: string[] = user.roles || ['user'];
    const primaryRole = userRoles[0] || 'user';

    const userPayload: UserAuthPayload = {
      id: user._id.toString(),
      email: user.email,
      role: primaryRole as 'user' | 'admin' | 'host',
    };

    // 3. Generate token with guaranteed types
    const appToken = this.generateAppToken({
      id: userPayload.id,
      email: userPayload.email,
      roles: userRoles // Passed as string[]
    });
    // --- END FIXES IN HANDLEGOOGLEAUTH METHOD ---

    return { appToken, user: userPayload };
  }

  // ... (rest of the methods)

  async getProfile(id: string) {
    //   const user = await this.repo.findById(id);
    //   if (!user) throw new AppError("User not found", 404);

    //   delete (user as any).passwordHash;

    //   return user;
  }

  async updateProfile(id: string, dto: UpdateUserDTO) {
    //   if (dto.password) {
    //     dto.passwordHash = await hashPassword(dto.password);
    //     delete dto.password;
    // }

    //   const updated = await this.repo.update(id, dto);
    //   if (!updated) throw new AppError("User not found", 404);

    //   delete (updated as any).passwordHash;

    //   return updated;
  }
}
