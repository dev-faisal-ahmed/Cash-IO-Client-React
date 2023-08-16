import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    userEmail: '',
    imageUrl: '',
    login: false,
  },
  reducers: {
    login: function (state, action) {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.imageUrl = action.payload.imageUrl;
      state.login = true;
    },
    logout: function (state) {
      state.userName = '';
      state.userEmail = '';
      state.imageUrl = '';
      state.login = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
