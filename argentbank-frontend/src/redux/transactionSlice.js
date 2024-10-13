import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
  const response = await fetch('http://localhost:3001/api/v1/transactions');
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  const data = await response.json();
  return data;
});

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default transactionSlice.reducer;
