import { User } from '../models/User';
import { UserRoles } from '@shared/types/userTypes.js';
// יצירת משתמש חדש
export const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};
// חיפוש משתמש לפי מייל
export const findUserByEmail = async (email) => {
    return await User.findOne({ email }).exec();
};
// חיפוש משתמש לפי מזהה
export const findUserById = async (id) => {
    return await User.findById(id).exec();
};
// שליפת כל המשתמשים (למשל לממשק מנהל)
export const getAllUsers = async () => {
    return await User.find().select('-passwordHash -verificationToken').exec();
};
// עדכון משתמש לפי מזהה עם שדות חדשים (partial update)
export const updateUserById = async (id, updates) => {
    return await User.findByIdAndUpdate(id, updates, { new: true }).exec();
};
// מחיקת משתמש לפי מזהה
export const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id).exec();
};
// קידום משתמש לתפקיד מנהל
export const promoteUserToAdmin = async (id) => {
    const user = await User.findById(id);
    if (!user)
        return null;
    user.role = UserRoles.ADMIN;
    return await user.save();
};
// סימון אימות מייל
export const verifyUserEmail = async (email, token) => {
    const user = await User.findOne({ email, verificationToken: token });
    if (!user)
        return null;
    user.isVerified = true;
    user.verificationToken = null;
    return await user.save();
};
// שינוי סיסמה (עם הצפנה)
import bcrypt from 'bcryptjs';
export const updateUserPassword = async (id, newPassword) => {
    const user = await User.findById(id);
    if (!user)
        return null;
    const hashed = await bcrypt.hash(newPassword, 10);
    user.passwordHash = hashed;
    return await user.save();
};
