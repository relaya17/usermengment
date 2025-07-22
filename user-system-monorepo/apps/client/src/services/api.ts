// src/services/api.ts
import type { IUserClient } from '@shared/types/userTypes';
import { log } from 'console';

export type IUser = IUserClient;

export interface AuthResponse {
    token: string;
    user: IUser;
}

export interface IRegisterData {
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

export interface ILoginCredentials {
    email: string;
    password: string;
}

const API_BASE_URL = 'http://localhost:5000/api'; // כתובת השרת

function getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || response.statusText || 'שגיאה בשרת';
        throw new Error(errorMessage);
    }
    return response.json();
}

// רישום משתמש חדש עם תמונה (multipart/form-data)
export async function register(userData: FormData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {  // פה תוקן
        method: 'POST',
        body: userData,
    });
    return handleResponse<AuthResponse>(response);
}

// התחברות משתמש
export async function login(credentials: ILoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {  // פה תוקן
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return handleResponse<AuthResponse>(response);
}

// קבלת פרטי המשתמש הנוכחי
export async function fetchCurrentUser(): Promise<{ user: IUser }> {
    const token = localStorage.getItem('token');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // תיקון: פנה ל-/users/profile
    const response = await fetch(`${API_BASE_URL}/users/profile`, { headers });

    return handleResponse<{ user: IUser }>(response);
}

// יציאה מהמערכת
export async function logout(): Promise<void> {
    const token = localStorage.getItem('token');

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers,
    });

    if (!response.ok) {
        throw new Error('שגיאה בעת התנתקות');
    }
}
