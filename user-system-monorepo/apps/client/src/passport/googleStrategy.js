import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
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
}, {
    timestamps: true,
});
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
