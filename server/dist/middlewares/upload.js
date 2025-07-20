import multer from 'multer';
import path from 'path';
import fs from 'fs';
// יצירת תיקיית uploads אם לא קיימת
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// הגדרת אחסון - שמירת קבצים על הדיסק עם שם ייחודי
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, uploadDir);
    },
    filename: function (_req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // שמירה עם סיומת מקורית
    },
});
// סינון לפי סוג הקובץ
const fileFilter = (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('פורמט קובץ לא נתמך. יש להעלות JPEG, PNG או WEBP.'));
    }
};
// יצוא המידלוור
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // מגבלת גודל של 5MB
});
