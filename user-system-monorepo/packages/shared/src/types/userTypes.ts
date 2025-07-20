// packages/shared/src/types/userTypes.ts
export const UserRoles = {
    USER: 'user',
    ADMIN: 'admin',
    BUSINESS: 'business',
} as const;

export type UserRole = typeof UserRoles[keyof typeof UserRoles];

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    phone?: string;
    passwordHash?: string;
    imagePath?: string;
    isVerified?: boolean;
    verificationToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    isGoogle?: boolean;
    active?: boolean;
}

// טיפוס בטוח לשליחה ללקוח (ללא מידע רגיש)
export interface IUserClient extends Omit<IUser, 'passwordHash' | 'verificationToken' | 'resetPasswordToken' | 'resetPasswordExpires' | '_id'> {
    _id: string;          // חובה, כי ב־Mongo זה המזהה הראשי
    name: string;
    email: string;
    role: UserRole;
    phone: string;
    isVerified: boolean;
    imagePath?: string;
}

export interface IAuthenticatedUser {
    user: IUserClient;
    token: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}export interface IRegisterData {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: 'user' | 'business' | 'admin';
    country: string;
    state: string;
    street: string;
    houseNumber: string;
    zip: string;
    imageAlt?: string;
    image?: File | null;
}



export interface IJwtPayload {
    _id: string;
    id?: string;
    email: string;
    name?: string;
    role: UserRole;
    picture?: string;
    isGoogle?: boolean;
    isAdmin?: boolean;
    isBusiness?: boolean;
    iat?: number;
    exp?: number;
}
export interface ExtendedJwtPayload {
    profilePictureUrl: string | undefined;
    _id: string;
    email: string;
    role: UserRole;
    // כל שדה נוסף שאתה רוצה
    iat?: number;
    exp?: number;
}
