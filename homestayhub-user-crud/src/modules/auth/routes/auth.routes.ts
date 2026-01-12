import { Router } from 'express';
import { AuthController } from '../controllers/user.controller.js';
import { container } from "../../../core/di/container.js";
import { body } from 'express-validator';
import { validateRequest } from '../../../core/middleware/validate.middleware.js';
import { registerValidation } from '../../../core/middleware/validate.middleware.js';
import { requireAuth } from '../../../core/middleware/auth.middleware.js';
import { setCoopSameOrigin } from '../../../core/middleware/security.middleware.js';

const router = Router();
const AuthController = container.resolve(AuthController);

// --- 1. GOOGLE AUTH FLOW ROUTES (FIXED) ---

// Route to initiate Google redirect (must be GET, must have COOP header)
// Assuming AuthController has a method named googleAuthRedirect
router.get('/google', 
    setCoopSameOrigin, // FIX: Apply COOP header
    AuthController.googleAuthRedirect
);

// Route that handles Google's callback (MUST BE GET, must have COOP header)
// FIX: Changed from router.post('/auth/google/callback', ...) to the below:
router.get('/google/callback', 
    setCoopSameOrigin, // FIX: Apply COOP header
    AuthController.googleCallback
);

// --- 2. LOCAL AUTH ROUTES ---

// User auth for protected pages
router.get('/user/me', requireAuth, AuthController.verifyUser);

router.post('/user/register', 
    registerValidation, 
    validateRequest, 
    AuthController.register
);

router.post('/user/login',
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest,
    AuthController.login
);

// --- 3. HEALTH CHECK ---
router.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'User routes operational. Implement /users GET endpoint here.' 
    });
});

export default router;