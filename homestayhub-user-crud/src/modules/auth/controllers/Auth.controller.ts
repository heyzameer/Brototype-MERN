import { Request, Response, NextFunction } from "express";
import { container } from "../../../core/di/container.js";
import { IUserService } from "../services/interfaces/IUserService.js";
import { RegisterUserDTO } from "../dto/register-user.dto.js";
import { inject, injectable } from "tsyringe";
import { AuthRequest } from "../../../core/types/request.types.js";
import axios from "axios"; // Required for potential callback handling

// Environment variables used by the controller
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL || 'http://localhost:3000';


/**
 * @class AuthController
 * @description Handles user-related operations, including authentication, registration, login, and Google OAuth flows.
 */
@injectable()
export class AuthController {

  /**
   * Creates an instance of AuthController.
   * @param {IUserService} userService - The user service dependency injected by tsyringe.
   */
  constructor( 
    @inject ("UserService") private userService: IUserService
  ){}

  // --- FIX 1: Implement the missing redirect method ---
  /**
   * Redirects the user to the Google OAuth consent screen.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @returns {Promise<void>} A promise that resolves when the redirection is complete or an error page is served.
   */
  public googleAuthRedirect = async (req: Request, res: Response) => {
    try {
      if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
        throw new Error("Google OAuth environment variables are not set.");
      }

      // Construct the Google OAuth URL
      const authUrl = new URL("accounts.google.com");
      authUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID);
      authUrl.searchParams.append("redirect_uri", GOOGLE_REDIRECT_URI);
      authUrl.searchParams.append("response_type", "code");
      authUrl.searchParams.append("scope", "profile email"); // Request necessary permissions
      authUrl.searchParams.append("access_type", "offline"); // Allows refreshing token (optional)
      authUrl.searchParams.append("prompt", "select_account"); // Forces selection for development

      // Redirect the user to Google's consent screen
      return res.redirect(authUrl.toString());

    } catch (error) {
      console.error("Error in googleAuthRedirect:", error);
      return res.redirect(`${CLIENT_BASE_URL}/login?error=oauth_config`);
    }
  };
  
  // --- FIX 2: Correctly handle code from GET request (Query Parameters) ---
  /**
   * Handles the callback from Google OAuth service. Exchanges the authorization code for tokens and logs the user in.
   * @param {Request} req - The Express request object containing the authorization code in query parameters.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The next function in the middleware stack.
   * @returns {Promise<void>} A promise that resolves when redirection or response is sent.
   */
  public googleCallback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // The authorization code is now passed in the query parameters from the GET request
      const code = req.query.code as string;
     
      if (!code) {
        // If the user denies consent, Google sends an error in the query parameters
        if (req.query.error) {
          console.warn("Google Auth denied:", req.query.error);
          return res.redirect(`${CLIENT_BASE_URL}/login?error=user_denied_consent`);
        }
        return res.status(400).json({ success: false, message: "Authorization code missing." });
      }

      // 1. Call the service to handle the complex logic (token exchange, user creation/login)
      const { appToken } = await this.userService.handleGoogleAuth(code);

      // 2. Redirect back to the client dashboard with the JWT
      // This final redirect must happen in the pop-up window, which then communicates with the main window.
      const redirectUrl = `${CLIENT_BASE_URL}/dashboard/user?token=${appToken}`; // Use the correct frontend path

      return res.redirect(redirectUrl);

    } catch (err) {
      console.error("Error in Google Auth callback:", err);
      return res.redirect(`${CLIENT_BASE_URL}/login?error=auth_failed`); 
    }
  };
  
  /**
   * Handles user registration via email and password.
   * @param {Request} req - The Express request object containing registration data in the body.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The next function in the middleware stack.
   * @returns {Promise<void>} A promise that resolves with the new user data or an error.
   */
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
      return next(err); 
    }
  };

  /**
   * Handles user login via email and password.
   * @param {Request} req - The Express request object containing login credentials.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The next function in the middleware stack.
   * @returns {Promise<void>} A promise that resolves with login result (e.g., JWT) or an error.
   */
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const loginResult = await this.userService.login(email, password);
      return res.json({
        success: true,
        data: loginResult,
      });
    } catch (err) {
      return next(err);
    }
  };

  /**
   * GET /user/me
   * Verifies the user's authentication status using a valid JWT provided in the request headers.
   * Only accessible if the user is authenticated.
   * @param {AuthRequest} req - The authenticated request object containing user information.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The next function in the middleware stack.
   * @returns {void}
   */
  public verifyUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log("Verifying user authentication status");
      console.log("Request user:", req.user);
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      // Return basic info about the logged-in user
      return res.status(200).json({
        success: true,
        message: "User is authenticated",
        user: {
          id: req.user.id,
          role: req.user.role,
          email: req.user.email
        }
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Retrieves the profile information for the authenticated user.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The next function in the middleware stack.
   * @returns {Promise<void>}
   */
  public getProfile = async (req: Request, res: Response, next: NextFunction) => {
    // Implementation omitted for brevity

  };

  /**
   * Updates the profile information for the authenticated user.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @param {NextFunction} next - The next function in the middleware stack.
   * @returns {Promise<void>}
   */
  public updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    // Implementation omitted for brevity
  };
}
