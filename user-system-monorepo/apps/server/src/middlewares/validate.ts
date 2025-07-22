import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// פונקציית בדיקת סיסמה שמחזירה מערך שגיאות ריק אם הכל בסדר
export const validatePassword = (password: string): string[] => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('לפחות 8 תווים');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('אות גדולה אחת באנגלית');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('אות קטנה אחת באנגלית');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('ספרה אחת');
    }
    if (!/[!@#$%^&*]/.test(password)) {
        errors.push('תו מיוחד אחד (!@#$%^&*)');
    }

    return errors;
};

// סכמת רישום (עם מינימום 8 תווים בלבד לסיסמה, בלי בדיקת תווים מורכבים - את זה נטפל בנפרד)

export const registerSchema = Joi.object({
    firstName: Joi.string().min(2).required().messages({
        'string.base': '✋ השם הפרטי חייב להיות מחרוזת',
        'string.min': '✋ השם הפרטי חייב להכיל לפחות 2 תווים',
        'any.required': '✋ יש להזין שם פרטי',
    }),
    middleName: Joi.string().allow('', null).optional().messages({
        'string.base': '✋ השם האמצעי חייב להיות מחרוזת',
    }),
    lastName: Joi.string().min(2).required().messages({
        'string.base': '✋ שם המשפחה חייב להיות מחרוזת',
        'string.min': '✋ שם המשפחה חייב להכיל לפחות 2 תווים',
        'any.required': '✋ יש להזין שם משפחה',
    }),
    email: Joi.string().email().required().messages({
        'string.email': '✋ נא להזין אימייל תקין',
        'any.required': '✋ יש להזין אימייל',
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': '✋ הסיסמה חייבת להכיל לפחות 8 תווים',
        'any.required': '✋ יש להזין סיסמה',
    }),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages({
        'string.pattern.base': '✋ הטלפון חייב להכיל 10 ספרות',
        'any.required': '✋ יש להזין מספר טלפון',
    }),
    country: Joi.string().required().messages({
        'any.required': '✋ יש להזין מדינה',
    }),
    state: Joi.string().required().messages({
        'any.required': '✋ יש להזין עיר',
    }),
    street: Joi.string().required().messages({
        'any.required': '✋ יש להזין רחוב',
    }),
    houseNumber: Joi.string().required().messages({
        'any.required': '✋ יש להזין מספר בית',
    }),
    zip: Joi.string().required().messages({
        'any.required': '✋ יש להזין מיקוד',
    }),
    role: Joi.string().valid('user', 'business', 'admin').required().messages({
        'any.only': '✋ יש לבחור תפקיד חוקי',
        'any.required': '✋ יש לבחור תפקיד',
    }),
    imageAlt: Joi.string().optional(),
});

// סכמת התחברות
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': '✋ האימייל חייב להיות מחרוזת',
        'string.email': '✋ נא להזין אימייל תקין',
        'any.required': '✋ יש להזין אימייל',
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': '✋ הסיסמה חייבת להיות מחרוזת',
        'string.min': '✋ הסיסמה חייבת להיות לפחות 6 תווים',
        'any.required': '✋ יש להזין סיסמה',
    }),
});

// מיידלוור לוולידציה של סכמת Joi
const validateBody = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(400).json({ errors });
    }
    next();
};

// מיידלוור לבדיקה מפורטת של סיסמה בנוסף לסכימה
export const validatePasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const password: string = req.body.password;
    if (!password) {
        return res.status(400).json({ errors: ['יש להזין סיסמה'] });
    }
    const errors = validatePassword(password);
    if (errors.length > 0) {
        return res.status(400).json({
            errors: [
                `הסיסמה חייבת להכיל: ${errors.join(', ')}`
            ]
        });
    }
    next();
};

export const validateRegister = [
    validateBody(registerSchema),
    validatePasswordMiddleware,
];

export const validateLogin = validateBody(loginSchema);
