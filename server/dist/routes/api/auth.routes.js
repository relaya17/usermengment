import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import User from '../../models/User.js'; // ודא שזה עם .js
console.log('🔥 auth router loaded');
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
// הגדרת multer לאחסון תמונות בתיקיית uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = file.originalname.split('.').pop();
        cb(null, uniqueSuffix + '.' + ext);
    },
});
const upload = multer({ storage });
router.get('/ping', (req, res) => {
    res.send('pong 🎯 המסלול פעיל');
});
// שים לב שהוספנו את middleware multer לעיבוד הקובץ בשם 'image'
router.post('/register', upload.single('image'), async (req, res) => {
    try {
        // נתוני הטופס מגיעים ב-req.body (מלבד הקובץ שמגיע ב-req.file)
        const { firstName, middleName, lastName, email, password, role, phone, country, state, street, houseNumber, zip, imageAlt } = req.body;
        // לוגים לאבחון
        console.log('📝 נתוני הרשמה שהתקבלו:', {
            firstName,
            lastName,
            email,
            role,
            phone,
            country,
            state,
            street,
            houseNumber,
            zip
        });
        // איחוד שם מלא
        const name = [firstName, middleName, lastName].filter(Boolean).join(' ');
        // בדיקה אם המשתמש כבר קיים
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'המשתמש כבר קיים' });
        }
        // הצפנת הסיסמה
        const hashedPassword = await bcrypt.hash(password, 10);
        // הכנת אובייקט המשתמש כולל נתיב לתמונה אם הועלתה
        const userData = {
            name, // שדה name מאוחד
            email,
            passwordHash: hashedPassword,
            role,
            phone,
            country,
            state,
            street,
            houseNumber,
            zip,
            imageAlt,
        };
        console.log('🔧 אובייקט המשתמש שייווצר:', userData);
        if (req.file) {
            userData.imagePath = `/uploads/${req.file.filename}`;
        }
        // יצירת המשתמש ושמירה במסד
        const user = new User(userData);
        await user.save();
        // יצירת טוקן JWT
        const token = jwt.sign({ id: user._id.toString(), email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: '1h',
        });
        // הסרת הסיסמה מהאובייקט שנשלח ללקוח
        const { passwordHash, ...userDataToSend } = user.toObject();
        console.log('✅ משתמש נרשם בהצלחה:', { email: user.email, role: user.role });
        res.status(201).json({ token, user: userDataToSend });
    }
    catch (error) {
        console.error('שגיאה ברישום:', error);
        res.status(500).json({ message: 'שגיאה פנימית בשרת', error: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('--- LOGIN DEBUG ---');
        console.log('email from client:', email);
        console.log('password from client:', password);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
        }
        if (user.isGoogle) {
            console.log('Login attempt: User registered via Google. Please use Google login:', email);
            return res.status(401).json({ message: 'משתמש זה נרשם באמצעות גוגל. אנא התחבר דרך גוגל.' });
        }
        if (!user.passwordHash) {
            console.error('Login attempt: User found but passwordHash is missing and not marked as Google user:', user.email);
            return res.status(500).json({ message: 'שגיאה פנימית בשרת: מידע משתמש חסר (סיסמה).' });
        }
        console.log('passwordHash from DB:', user.passwordHash);
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        console.log('bcrypt.compare result:', isMatch);
        if (!isMatch) {
            console.log('Incorrect password for user:', email);
            return res.status(401).json({ message: 'אימייל או סיסמה שגויים' });
        }
        const token = jwt.sign({ id: user._id.toString(), email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        const { passwordHash, ...userData } = user.toObject();
        console.log('Login successful for user:', userData.email);
        res.json({ token, user: userData });
    }
    catch (error) {
        console.error('שגיאה בהתחברות:', error);
        res.status(500).json({ message: 'שגיאה פנימית בשרת' });
    }
});
export default router;
