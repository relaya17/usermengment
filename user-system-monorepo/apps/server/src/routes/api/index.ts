import express from 'express';
import { Router } from 'express';

import passwordRoutes from './password.routes';
import emailRoutes from './email.routes';
import adminRoutes from './admin.routes';
import usersRoutes from './users.routes';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';

const router: Router = express.Router();

router.use('/password', passwordRoutes);
router.use('/email', emailRoutes);
router.use('/admin', adminRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes); // הוסף את זה
export default router;
