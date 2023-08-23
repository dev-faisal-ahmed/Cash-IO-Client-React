import { createSlice } from '@reduxjs/toolkit';

// actions
const apiSlice = createSlice({
  name: 'api',
  initialState: {
    wallets: [],
    transactions: [],
  },
  reducers: {
    updateWallets: function (state, action) {
      state.wallets = action.payload.wallets;
    },
    updateTransactions: function (state, action) {
      state.transactions = action.payload.transactions;
    },
  },
});

export const { updateWallets, updateTransactions } = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
