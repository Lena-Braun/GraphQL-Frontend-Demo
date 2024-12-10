// app/slices/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    // Add other slices here
});

export default rootReducer;