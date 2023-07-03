import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import issueReducer from './slices/issueSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    issue: issueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
