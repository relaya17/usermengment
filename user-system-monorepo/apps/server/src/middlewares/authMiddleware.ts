// apps/server/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// 🆕 חשוב ביותר: ודא ששורה זו קיימת *בדיוק* כך, ואינה מוערת!
import { IUserClient, IJwtPayload, UserRole } from '@shared/types/userTypes.js'; // 🆕 עדכן את הנתיב אם יש צורך

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // ודא שזה נטען כראוי

/**
 * מידלוור אימות: מוודא שהמשתמש מאומת ומצרף את פרטי המשתמש לאובייקט ה-Request.
 * @param req אובייקט הבקשה של Express.
 * @param res אובייקט התגובה של Express.
 * @param next פונקציית המידלוור הבאה בשרשרת.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided or invalid format.' });
    }

    const token = authHeader.split(' ')[1];

    // 🆕 אימות הטוקן וטיפוסו כ-IJwtPayload
    const decoded = jwt.verify(token, JWT_SECRET) as IJwtPayload;

    // 🆕 השמת פרטי המשתמש לאובייקט req.user
    // מכיוון ש-express.d.ts כבר הרחיב את Request עם user?: IUserClient,
    // TypeScript יאפשר את זה.
    // נמיר את האובייקט כדי לוודא התאמה ל-IUserClient
    (req as Request).user = {
      _id: decoded._id, // מודל המשתמש בשרת מצפה ל-ObjectId, אך ב-IUserClient הוא string
      email: decoded.email,
      role: decoded.role,
      // name: decoded.name, // Removed because 'name' does not exist on IJwtPayload
      // picture: decoded.picture, // Removed because 'picture' does not exist on IJwtPayload
      // isGoogle: decoded.isGoogle, // Removed because 'isGoogle' does not exist on IJwtPayload
      // אם יש שדות נוספים ב-IUserClient שצריך להעביר מהטוקן, הוסף אותם כאן
    } as unknown as IUserClient; // 🆕 ודא שהטיפוס הוא IUserClient

    next(); // המשך למידלוור/ראוט הבא
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error('JWT Error:', error.message);
      return res.status(401).json({ message: 'Unauthorized: Invalid or expired token.' });
    }
    console.error('Authentication middleware error:', error);
    return res.status(500).json({ message: 'Authentication failed.' });
  }
};

/**
 * מידלוור הרשאה לתפקידים ספציפיים.
 * @param allowedRoles מערך של תפקידי משתמש מותרים (לדוגמה: [UserRole.ADMIN, UserRole.BUSINESS])
 */
export const authorizeRoles = (allowedRoles: UserRole[]) => { // 🆕 שימוש ב-UserRole
  return (req: Request, res: Response, next: NextFunction) => {
    // 🆕 ודא ש-req.user קיים (כי מידלוור isAuthenticated אמור לרוץ לפני זה)
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated.' });
    }

    // 🆕 בדיקה האם תפקיד המשתמש נמצא ברשימת התפקידים המותרים
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource.' });
    }

    next(); // המשך למידלוור/ראוט הבא
  };
};
