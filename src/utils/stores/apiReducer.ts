import { createSlice } from '@reduxjs/toolkit';

// actions

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    balance: 0,
    expense: 0,
    revenue: 0,
  },
  reducers: {
    updateSummary: function (state, action) {
      state.balance = action.payload.balance;
      state.expense = action.payload.expense;
      state.revenue = action.payload.revenue;
    },
  },
});

export const { updateSummary } = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
