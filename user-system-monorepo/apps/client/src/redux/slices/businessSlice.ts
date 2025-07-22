export interface Business {
    _id: string;
    title: string;
    description: string;
    address: string;
    phone: string;
    image: string;
}

export interface BusinessState {
    all: Business[];
    loading: boolean;
    error: string | null;
}

const initialState: BusinessState = {
    all: [],
    loading: false,
    error: null,
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        // Example reducer (add your own as needed)
        setBusinesses(state, action: PayloadAction<Business[]>) {
            state.all = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setBusinesses, setLoading, setError } = businessSlice.actions;
export default businessSlice.reducer;
