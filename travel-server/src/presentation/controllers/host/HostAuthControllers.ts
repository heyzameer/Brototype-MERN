import { UseCases } from "@/di/useCases";
import { Cookies, StatusCode } from "@/types";
import HostSignupUseCase from "@/use_case/host/HostSignupUseCase";
import HostSigninUseCase from "@/use_case/host/HostSigninUseCase";
import HostOtpUseCase from "@/use_case/host/HostOtpUseCase";
import HostResetPasswordUseCase from "@/use_case/host/HostResetPasswordUseCase";
import HostOAuthUseCase from "@/use_case/host/HostOAuthUseCase";
import HostProfileUseCase from "@/use_case/host/HostProfileUseCase";
import { inject } from "inversify";
import { tryCatch } from "@/utils";

export default class HostAuthControllers {
  constructor(
    @inject(UseCases.HostSignupUseCase) private readonly hostSignupUseCase: HostSignupUseCase,
    @inject(UseCases.HostSigninUseCase) private readonly hostSigninUseCase: HostSigninUseCase,
    @inject(UseCases.HostOtpUseCase) private readonly hostOtpUseCase: HostOtpUseCase,
    @inject(UseCases.HostResetPasswordUseCase) private readonly hostResetPasswordUseCase: HostResetPasswordUseCase,
    @inject(UseCases.HostOAuthUseCase) private readonly hostOAuthUseCase: HostOAuthUseCase,
    @inject(UseCases.HostProfileUseCase) private readonly hostProfileUseCase: HostProfileUseCase,
  ) {}

  signup = tryCatch(async (req, res) => {
    const { name, email, password } = req.body;
  
    // Validate required fields at controller level
    if (!name || !email || !password) {
      return res
        .status(StatusCode.BadRequest)
        .json({ message: "Name, email, and password are required" });
    }
  
    if (typeof password !== "string") {
      return res
        .status(StatusCode.BadRequest)
        .json({ message: "Invalid password" });
    }
  
    // Now pass only validated fields → 100% safe
    await this.hostSignupUseCase.exec({ name, email, password });
  
    res.status(StatusCode.Created).json({
      message: "Host account created successfully. Verification pending admin approval.",
    });
  });

  signin = tryCatch(async (req, res) => {
    const { email } = await this.hostSigninUseCase.exec(req.body);
    res
      .status(StatusCode.Success)
      .json({ message: "Host sign-in initiated. Please check your email for the OTP.", email });
  });

  oauthSignin = tryCatch(async (req, res) => {
    const { accessToken, refreshToken, user } = await this.hostOAuthUseCase.exec(req.body);

    res.cookie(Cookies.User, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res
      .status(StatusCode.Success)
      .json({ accessToken, user, message: "Host OAuth Signin Success. You are now signed in." });
  });

  verifyOtp = tryCatch(async (req, res) => {
    const { accessToken, refreshToken, user } = await this.hostOtpUseCase.exec(req.body);

    res.cookie(Cookies.User, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res
      .status(StatusCode.Success)
      .json({ accessToken, user, message: "Host OTP verified. You are now signed in." });
  });

  resendOtp = tryCatch(async (req, res) => {
    await this.hostOtpUseCase.resendOtp(req.body);
    res.status(StatusCode.Success).json({ message: "A new OTP has been sent to your email." });
  });

  forgotPassword = tryCatch(async (req, res) => {
    await this.hostResetPasswordUseCase.forgotPassword(req.body);
    res.status(StatusCode.Success).json({ message: "A password reset link has been sent to your email." });
  });

  resetPassword = tryCatch(async (req, res) => {
    await this.hostResetPasswordUseCase.exec(req.body);
    res
      .status(StatusCode.Success)
      .json({ message: "Host password reset successfully. Please sign in with your new password." });
  });

  refreshAccessToken = tryCatch(async (req, res) => {
    const { user_token } = req.cookies;
    const { accessToken } = await this.hostSigninUseCase.refreshAccessToken(user_token);
    res.status(StatusCode.Success).json({ accessToken, message: "Host access token refreshed successfully." });
  });

  logout = tryCatch(async (req, res) => {
    const { user_token } = req.cookies;
    if (!user_token) return res.sendStatus(StatusCode.NoContent);

    res.clearCookie(Cookies.User, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.status(StatusCode.Success).json({ message: "Successfully logged out." });
  });

  getProfile = tryCatch(async (req, res) => {
    const profile = await this.hostProfileUseCase.getProfile(req.user!.id);
    
    res.status(StatusCode.Success).json({ profile });
  });
}
