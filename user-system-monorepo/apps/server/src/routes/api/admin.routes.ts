import express, { Router } from 'express';
import {
  getAllUsers,
  deleteUser,
  promoteToAdmin,
} from '../../controllers/auth.controller.js';
import {
  isAuthenticated,
  authorizeRoles,
} from '../../middlewares/isAuthenticated.js';
import { UserRoles, UserRole } from '@shared/types/userTypes.js';

const router: Router = express.Router();

router.get(
  '/users',
  isAuthenticated,
  authorizeRoles([UserRoles.ADMIN]),

  getAllUsers
);

router.delete(
  '/users/:id',
  isAuthenticated,
  authorizeRoles([UserRoles.ADMIN]),

  deleteUser
);

router.patch(
  '/users/:id/promote',
  isAuthenticated,
  authorizeRoles([UserRoles.ADMIN]),

  promoteToAdmin
);

export default router;
