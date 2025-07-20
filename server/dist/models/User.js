import { Schema, model } from 'mongoose';
import { UserRoles } from '@shared/types/userTypes.js';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRoles), required: true },
    isVerified: { type: Boolean, default: false },
    imagePath: { type: String },
    phone: { type: String },
    verificationToken: { type: String, default: null },
    isGoogle: { type: Boolean, default: false },
});
export const User = model('User', UserSchema);
export default User;
