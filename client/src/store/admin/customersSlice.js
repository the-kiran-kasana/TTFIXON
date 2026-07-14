import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customersApi } from "@/lib/adminApi";

/**
 * Fetch the customer list. Pass the admin token and optional query params
 * (e.g. { search, role, status }) from the component.
 */
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

/**
 * Create a customer. Resolves with the created user on success.
 */
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

const initialState = {
  items: [],
  loading: false,
  error: null,
  creating: false,
  createError: null,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    clearCreateError(state) {
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // create
      .addCase(createCustomer.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.creating = false;
        if (action.payload) state.items.unshift(action.payload);
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload || action.error.message;
      });
  },
});

export const { clearCreateError } = customersSlice.actions;
export default customersSlice.reducer;
