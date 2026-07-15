import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customersApi from "@/services/customersApi";

export const fetchCustomers = createAsyncThunk(
  "customers/fetch",
  async ({ token, params } = {}, { rejectWithValue }) => {
    try {
      const data = await customersApi.list(token, params);
      return data.users || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createCustomer = createAsyncThunk(
  "customers/create",
  async ({ token, body }, { rejectWithValue }) => {
    try {
      const data = await customersApi.create(token, body);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ token, id, body }, { rejectWithValue }) => {
    try {
      const data = await customersApi.update(token, id, body);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      await customersApi.remove(token, id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  actionLoading: false,
  actionError: null,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    clearCustomerError(state) { state.actionError = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending,   (s) => { s.loading = true;  s.error = null; })
      .addCase(fetchCustomers.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchCustomers.rejected,  (s, a) => { s.loading = false; s.error = a.payload || a.error.message; })

      .addCase(createCustomer.pending,   (s) => { s.actionLoading = true;  s.actionError = null; })
      .addCase(createCustomer.fulfilled, (s, a) => { s.actionLoading = false; if (a.payload) s.items.unshift(a.payload); })
      .addCase(createCustomer.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload || a.error.message; })

      .addCase(updateCustomer.pending,   (s) => { s.actionLoading = true;  s.actionError = null; })
      .addCase(updateCustomer.fulfilled, (s, a) => {
        s.actionLoading = false;
        const idx = s.items.findIndex((c) => c._id === a.payload?._id);
        if (idx !== -1 && a.payload) s.items[idx] = a.payload;
      })
      .addCase(updateCustomer.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload || a.error.message; })

      .addCase(deleteCustomer.pending,   (s) => { s.actionLoading = true;  s.actionError = null; })
      .addCase(deleteCustomer.fulfilled, (s, a) => { s.actionLoading = false; s.items = s.items.filter((c) => c._id !== a.payload); })
      .addCase(deleteCustomer.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload || a.error.message; });
  },
});

export const { clearCustomerError } = customersSlice.actions;
export default customersSlice.reducer;
