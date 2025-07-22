import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, fetchCurrentUser } from '../../services/api';
export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
    try {
        const loginDataRes = await login(credentials);
        const { token, user } = loginDataRes;
        localStorage.setItem('token', token);
        return { token, user };
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});
export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
    try {
        const formData = new FormData();
        Object.entries(userData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (key === 'image' && value instanceof File) {
                    formData.append(key, value);
                }
                else {
                    formData.append(key, value);
                }
            }
        });
        const { token, user } = await register(formData);
        localStorage.setItem('token', token);
        return { token, user };
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
});
export const loadUserFromTokenThunk = createAsyncThunk('auth/loadUserFromToken', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return thunkAPI.rejectWithValue('No token found');
        }
        const { user } = await fetchCurrentUser();
        return { token, user };
    }
    catch {
        return thunkAPI.rejectWithValue('Failed to load user from token');
    }
});
