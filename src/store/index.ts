import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root';

export const store = configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
