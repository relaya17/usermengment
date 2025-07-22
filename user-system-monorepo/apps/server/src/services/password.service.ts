// src/services/password.service.ts

import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// בקצרה - דוגמא לפונקציה לבקשת איפוס סיסמה
export const requestPasswordReset = async (req: any, res: any) => {
    // לוגיקה לשליחת מייל עם טוקן לאיפוס סיסמה
};

// פונקציה לאיפוס הסיסמה בפועל
export const resetPassword = async (req: any, res: any) => {
    // לוגיקה לאיפוס הסיסמה עם הטוקן שנשלח
};
