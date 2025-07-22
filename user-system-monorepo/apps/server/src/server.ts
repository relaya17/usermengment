// --- קודם כל כל הייבוא (כמו שאתה כבר עשית) ---
import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { upload } from './middlewares/upload.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

import type { UserRole, UserRoles } from '@shared/types/userTypes.js'; // עדכון הייבוא של UserRoles ו־UserRoleCannot find module 'dotenv' or its corresponding type declarations.ts(2307)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import authRouter from './routes/api/auth.routes.js';
import usersRoutes from './routes/api/users.routes.js';
import adminRoutes from './routes/api/admin.routes.js';

import { connectToMongo } from './db/connect.js';

const envPathMonorepoRoot = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPathMonorepoRoot });

// --- יצירת תיקיית uploads אם לא קיימת ---
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
];
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // לאפשר גם בקשות ללא origin (כמו curl או Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// בסיסי
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// תיקיית uploads סטטית
app.use('/uploads', express.static(uploadsDir));

// --- רוט להעלאת תמונות עם multer ---
app.post('/api/upload', upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'לא הועלה קובץ' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// חיבור למסד
connectToMongo();

// ניתובים
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRoutes);

// Middleware לטיפול בשגיאות – חייב להיות בסוף
app.use(errorHandler);

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
