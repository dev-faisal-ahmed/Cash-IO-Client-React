import { createSlice } from '@reduxjs/toolkit';

// actions

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    balance: 0,
    expense: 0,
    revenue: 0,
    transactions: [],
  },
  reducers: {
    updateSummary: function (state, action) {
      state.balance = action.payload.balance;
      state.expense = action.payload.expense;
      state.revenue = action.payload.revenue;
    },
    updateTransactions: function (state, action) {
      state.transactions = action.payload.transactions;
    },
  },
});

export const { updateSummary, updateTransactions } = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
