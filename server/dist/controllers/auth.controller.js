import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { sendVerificationEmail } from '../services/email.service';
import { UserRoles, } from '@shared/types/userTypes';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// רישום משתמש
export const registerUserWithImage = async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, password, phone, role, country, state, street, houseNumber, zip, imageAlt, } = req.body;
        if (!firstName || !lastName || !email || !password || !role) {
            return res.status(400).json({ message: 'יש למלא את כל השדות הנדרשים' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'משתמש עם המייל הזה כבר קיים' });
        }
        if (![UserRoles.USER, UserRoles.ADMIN, UserRoles.BUSINESS].includes(role)) {
            return res.status(400).json({ message: 'תפקיד לא חוקי' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
        const imagePath = req.file?.filename;
        const newUser = new User({
            name: `${firstName} ${middleName || ''} ${lastName}`,
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
            imagePath,
            isVerified: false,
            verificationToken,
        });
        await newUser.save();
        await sendVerificationEmail(email, verificationToken);
        return res.status(201).json({ message: 'נרשמת בהצלחה! נא אמת את כתובת האימייל שלך.' });
    }
    catch (error) {
        console.error('שגיאה ביצירת משתמש:', error);
        return res.status(500).json({ message: 'שגיאה בשרת בעת יצירת משתמש' });
    }
};
// אימות מייל
export const verifyEmail = async (req, res) => {
    const { token } = req.params;
    if (!token) {
        return res.status(400).json({ message: 'טוקן אימות חסר' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user || user.verificationToken !== token) {
            return res.status(400).json({ message: 'טוקן אימות שגוי או שפג תוקפו' });
        }
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        return res.status(200).json({ message: 'המייל אומת בהצלחה' });
    }
    catch (error) {
        console.error('אימות נכשל:', error);
        return res.status(400).json({ message: 'טוקן לא תקין או פג תוקף' });
    }
};
// שליפת כל המשתמשים
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().select('-password -verificationToken');
        const clientUsers = users.map((user) => {
            const { _id, password, verificationToken, ...rest } = user.toObject();
            return {
                id: _id.toString(),
                ...rest,
            };
        });
        return res.status(200).json(clientUsers);
    }
    catch (error) {
        console.error('שגיאה בשליפת משתמשים:', error);
        return res.status(500).json({ message: 'שגיאה בקבלת המשתמשים' });
    }
};
// שליפת משתמש לפי ID
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password -verificationToken');
        if (!user)
            return res.status(404).json({ message: 'משתמש לא נמצא' });
        return res.json(user);
    }
    catch (error) {
        console.error('שגיאה בשליפת משתמש:', error);
        return res.status(500).json({ message: 'שגיאה בשרת' });
    }
};
// עדכון משתמש
export const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password -verificationToken');
        if (!updated)
            return res.status(404).json({ message: 'משתמש לא נמצא' });
        return res.json(updated);
    }
    catch (error) {
        console.error('שגיאה בעדכון:', error);
        return res.status(500).json({ message: 'שגיאה בעדכון המשתמש' });
    }
};
// מחיקת משתמש
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.findByIdAndDelete(id);
        if (!deleted)
            return res.status(404).json({ message: 'משתמש לא נמצא' });
        return res.status(200).json({ message: 'המשתמש נמחק' });
    }
    catch (error) {
        console.error('שגיאה במחיקה:', error);
        return res.status(500).json({ message: 'שגיאה בשרת' });
    }
};
// קידום למנהל
export const promoteToAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ message: 'משתמש לא נמצא' });
        user.role = UserRoles.ADMIN;
        await user.save();
        return res.status(200).json({ message: 'המשתמש קודם למנהל' });
    }
    catch (error) {
        console.error('שגיאה בקידום:', error);
        return res.status(500).json({ message: 'שגיאה בקידום המשתמש' });
    }
};
// פרופיל משתמש מחובר
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId)
            return res.status(401).json({ message: 'אין הרשאה' });
        const user = await User.findById(userId).select('-password -verificationToken');
        if (!user)
            return res.status(404).json({ message: 'משתמש לא נמצא' });
        const clientUser = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone || '',
            isVerified: user.isVerified,
            imagePath: user.imagePath,
        };
        return res.status(200).json(clientUser);
    }
    catch (error) {
        console.error('שגיאה בפרופיל:', error);
        return res.status(500).json({ message: 'שגיאה בשרת' });
    }
};
