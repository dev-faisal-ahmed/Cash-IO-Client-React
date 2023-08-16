import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    imageUrl: '',
    login: false,
  },
  reducers: {
    login: function (state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.imageUrl = action.payload.imageUrl;
      state.login = true;
    },
    logout: function (state) {
      state.name = '';
      state.email = '';
      state.imageUrl = '';
      state.login = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
