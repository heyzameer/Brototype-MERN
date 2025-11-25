import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { container } from "../../../core/di/container.js";

const router = Router();
const userController = container.resolve(UserController);

router.post('/register', userController.register);
// Placeholder for user CRUD routes
router.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'User routes operational. Implement /users GET endpoint here.' 
    });
});



export default router;