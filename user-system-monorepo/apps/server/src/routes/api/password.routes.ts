import { Router } from 'express';
import { requestPasswordReset, resetPassword } from '../../services/password.service';

const router: Router = Router();

router.post('/request-reset', requestPasswordReset);
router.post('/reset', resetPassword);

export default router;
