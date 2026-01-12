import { Request, Response, NextFunction } from "express";

/**
 * Middleware to set the Cross-Origin-Opener-Policy (COOP) header.
 * * Purpose: This is the fix for the client-side error: 
 * "Cross-Origin-Opener-Policy policy would block the window.postMessage call."
 * * The header 'same-origin' is required on the server's response for the routes 
 * involved in the Google Sign-In pop-up flow to ensure the pop-up can communicate
 * the authentication status back to the main application window.
 */
export function setCoopSameOrigin(req: Request, res: Response, next: NextFunction) {
    // Setting this header allows windows opened by the current domain (your server)
    // to interact with the main window, which is crucial for OAuth pop-up flows.
    res.set('Cross-Origin-Opener-Policy', 'same-origin');
    
    // Proceed to the next middleware or controller function
    next();
}