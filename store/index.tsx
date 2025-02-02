// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices'; // Import your root reducer or slices

const store = configureStore({
    reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;