import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'business';
    phone?: string;
    country?: string;
    state?: string;
    street?: string;
    houseNumber?: string;
    zip?: string;
    imageURL?: string;
    isBusiness?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin', 'business'], default: 'user' },
        phone: { type: String, default: null },
        country: { type: String, default: null },
        state: { type: String, default: null },
        street: { type: String, default: null },
        houseNumber: { type: String, default: null },
        zip: { type: String, default: null },
        imageURL: { type: String, default: null },
        isBusiness: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
