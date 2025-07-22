import { Document, Schema, model } from 'mongoose';
import { UserRoles, UserRole } from '@shared/types/userTypes.js';

export interface IUserBase {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    isVerified: boolean;
    imagePath?: string;
    phone?: string;
    verificationToken?: string | null;
    isGoogle?: boolean;
}

// כאן תוסיפי את _id: string בצורה מפורשת
export interface IUserDocument extends IUserBase, Document {
    _id: string;
}

const UserSchema = new Schema<IUserDocument>({
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

export const User = model<IUserDocument>('User', UserSchema);
export default User;
