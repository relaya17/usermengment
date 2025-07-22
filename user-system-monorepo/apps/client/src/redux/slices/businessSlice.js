const initialState = {
    all: [],
    loading: false,
    error: null,
};
import { createSlice } from '@reduxjs/toolkit';
const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        // Example reducer (add your own as needed)
        setBusinesses(state, action) {
            state.all = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});
export const { setBusinesses, setLoading, setError } = businessSlice.actions;
export default businessSlice.reducer;
