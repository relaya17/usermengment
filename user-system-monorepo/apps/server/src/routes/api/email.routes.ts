import express, { Router } from 'express';
import { registerUserWithImage } from '../../controllers/auth.controller';
import { sendVerificationEmail } from '../../services/email.service';
import { verifyEmail } from '../../controllers/auth.controller';

const router: Router = express.Router();

// שליחת מייל לאימות
router.post('/send', async (req, res, next) => {
    try {
        const { email, token } = req.body;
        if (!email || !token) {
            return res.status(400).json({ message: 'Missing email or token' });
        }
        await sendVerificationEmail(email, token);
        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        next(error);
    }
});


// אימות מייל (קישור מהמייל)
router.get('/verify/:token', verifyEmail);

export default router;
