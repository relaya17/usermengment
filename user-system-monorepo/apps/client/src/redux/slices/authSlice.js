import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk } from '../thunks/authThunks';
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    registerStatus: undefined,
    registerError: undefined
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('token');
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        })
            .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed';
            state.isAuthenticated = false;
        });
    },
});
export const { login, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
