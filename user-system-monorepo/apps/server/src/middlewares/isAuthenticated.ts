import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

// 🆕 **תיקון קריטי: הסר את 'UserRole' מרשימת הייבוא כאן.**
// השאר רק את הטיפוסים שאתה צריך: IJwtPayload ו-IUserClient.
import { IJwtPayload, IUserClient } from '@shared/types/userTypes.js';

// הרחבת ממשק Request של Express כדי לכלול 'user'
declare module 'express' {
    interface Request {
        user?: IUserClient;
    }
}

// Middleware לאימות משתמש ע"פ JWT
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'נדרש טוקן אימות (Bearer Token).' });
        }
        const token = authHeader.split(' ')[1];
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET אינו מוגדר במשתני הסביבה.');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as IJwtPayload;

        const userId = decoded._id || decoded.id;
        if (!userId) {
            return res.status(401).json({ message: 'טוקן אימות חסר ID משתמש.' });
        }

        const user = await User.findById(userId).select('-passwordHash');
        if (!user) {
            return res.status(401).json({ message: 'משתמש לא נמצא.' });
        }

        req.user = user.toObject() as IUserClient;
        next();
    } catch (error: any) {
        console.error('שגיאת אימות:', error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'טוקן אימות לא חוקי.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'טוקן אימות פג תוקף.' });
        }
        return res.status(500).json({ message: 'כשל באימות השרת.', error: error.message });
    }
};

// Middleware להרשאות לפי תפקידים
// 🆕 **תיקון: הגדרת טיפוס UserRoleType מקומי שוב, כי UserRole לא מיובא כערך.**
// זה הכרחי אם אתה משתמש ב-UserRole בפונקציה הזו כטיפוס.
type UserRoleType = "user" | "admin" | "business";

export const authorizeRoles = (roles: UserRoleType[]) => { // 🆕 שימוש ב-UserRoleType
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'לא מאומת.' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'אין הרשאה.' });
        }
        next();
    };
};
