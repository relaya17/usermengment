// src/routes/api/user.routes.ts
import express from 'express';
import * as authController from '../../controllers/auth.controller';  // שיניתי את השם כאן
import { isAuthenticated } from '../../middlewares/isAuthenticated';
import { validateRegister } from '../../middlewares/validate';

const router: express.Router = express.Router();

router.post('/register', validateRegister, authController.registerUserWithImage);
router.get('/verify/:token', authController.verifyEmail);
router.get('/', authController.getAllUsers);
router.get('/profile', isAuthenticated, authController.getUserProfile);

router.get('/:id', authController.getUserById);
router.put('/:id', authController.updateUser);
router.delete('/:id', authController.deleteUser);
router.post('/:id/promote', authController.promoteToAdmin);

export default router;
