import { Model } from 'mongoose';
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
export interface IUserModel extends Model<IUser, {}, IUserMethods> {
}
declare const _default: IUserModel;
export default _default;
//# sourceMappingURL=authService.d.ts.map