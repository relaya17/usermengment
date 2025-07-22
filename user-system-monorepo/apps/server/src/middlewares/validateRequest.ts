import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateRequest = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            console.error('🚨 שגיאות וולידציה:', error.details);

            const errors = error.details.map((detail) => ({
                message: detail.message,
                path: detail.path,
                type: detail.type,
                context: detail.context,
            }));

            return res.status(400).json({ errors });
        }

        next();
    };
};
