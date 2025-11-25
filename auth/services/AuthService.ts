import { IAuthRepository } from "../repositories/interfaces/IAuthRepository.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../../core/utils/jwt.util.js";
import { hashPassword, comparePassword } from "../../../core/utils/password.util.js"
import { AppError } from "../../../core/errors/AppError.js";

export class AuthService {
  constructor(private repo: IAuthRepository) {}

  async register(dto: any) {
    const exists = await this.repo.findUserByEmail(dto.email);
    if (exists) throw new AppError("Email exists", 400);
    const passwordHash = await hashPassword(dto.password);
    const user = await this.repo.createUser({ email: dto.email, passwordHash, name: dto.name, roles: ["user"] });
    const access = signAccessToken({ sub: user._id, roles: user.roles });
    const refresh = signRefreshToken({ sub: user._id, roles: user.roles });
    // store hashed refresh
    await this.repo.saveRefreshToken(user._id!, refresh);
    return { user: { ...user, passwordHash: undefined }, access, refresh };
  }

  async login(email: string, password: string) {
    const user = await this.repo.findUserByEmail(email);
    if (!user) throw new AppError("Invalid credentials", 401);
    const ok = await comparePassword(password, user.passwordHash || "");
    if (!ok) throw new AppError("Invalid credentials", 401);
    const access = signAccessToken({ sub: user._id, roles: user.roles });
    const refresh = signRefreshToken({ sub: user._id, roles: user.roles });
    await this.repo.saveRefreshToken(user._id!, refresh);
    return { user: { ...user, passwordHash: undefined }, access, refresh };
  }

  async refresh(userId: string, token: string) {
    // verify token and compare stored hashed token
    const valid = await this.repo.findRefreshToken(userId, token);
    if (!valid) throw new AppError("Invalid refresh token", 401);
    const access = signAccessToken({ sub: userId, roles: [] }); // roles can be fetched
    const refresh = signRefreshToken({ sub: userId, roles: [] });
    await this.repo.saveRefreshToken(userId, refresh);
    return { access, refresh };
  }
    async logout(userId: string) {
    await this.repo.revokeRefreshToken(userId);
    }
}
