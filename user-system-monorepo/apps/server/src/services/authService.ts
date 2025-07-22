import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
    _id: any;
    toObject(): unknown;
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'admin' | 'business';
    isAdmin?: boolean;
    isBusiness?: boolean;
}

export interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> { }

const UserSchema = new Schema<IUser, IUserModel, IUserMethods>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'business'], required: true },
    isAdmin: { type: Boolean, default: false },
    isBusiness: { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password ?? '', 10);
    next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password ?? '');
};

UserSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    }
});

export default mongoose.model<IUser, IUserModel>('User', UserSchema);
