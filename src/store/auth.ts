import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {
      _id: '',
      name: '',
      email: '',
    },
    isOnboarded: false,
  },
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      const decoded: {
        _id: string;
        email: string;
        name: string;
      } = jwt_decode(token);

      state.isAuthenticated = true;
      state.user = decoded;
    },

    logout: state => {
      state.isAuthenticated = false;
      state.user = {
        _id: '',
        name: '',
        email: '',
      };
    },

    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    onboard: state => {
      state.isOnboarded = true;
    },
  },
});

export const { login, logout, updateProfile, onboard } = authSlice.actions;

export default authSlice.reducer;
