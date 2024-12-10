// app/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    _id: string;
    user_id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    phone: string;
    account_address: string;
    chain: string;
    credits: number;
    total_credits: number;
    latest_mint_timestamp: string;
    twitter_link: string;
    linkedin_link: string;
    facebook_link: string;
    instagram_link: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: null | User;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setdata(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        login(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
        signup(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
    },

});

export const { login, logout, setdata } = authSlice.actions;
export default authSlice.reducer;