import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vendorApi from "@/services/vendorApi";

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchVendors = createAsyncThunk(
  "vendors/fetchAll",
  async ({ token, search, status, page }, { rejectWithValue }) => {
    try { return await vendorApi.getAll(token, { search, status, page }); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const fetchVendorStats = createAsyncThunk(
  "vendors/fetchStats",
  async (token, { rejectWithValue }) => {
    try { return (await vendorApi.getStats(token)).stats; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const createVendor = createAsyncThunk(
  "vendors/create",
  async ({ token, vendorData }, { rejectWithValue }) => {
    try { return (await vendorApi.create(token, vendorData)).vendor; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const updateVendor = createAsyncThunk(
  "vendors/update",
  async ({ token, id, vendorData }, { rejectWithValue }) => {
    try { return (await vendorApi.update(token, id, vendorData)).vendor; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const deleteVendor = createAsyncThunk(
  "vendors/delete",
  async ({ token, id }, { rejectWithValue }) => {
    try { await vendorApi.remove(token, id); return id; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  vendors: [], total: 0,
  stats: { total: 0, active: 0, pending: 0, suspended: 0 },
  loading: false, statsLoading: false, error: null,
  actionLoading: false, actionError: null, actionSuccess: null,
};

const vendorSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    clearActionState(state) { state.actionError = null; state.actionSuccess = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending,    (s) => { s.loading = true; s.error = null; })
      .addCase(fetchVendors.fulfilled,  (s, a) => { s.loading = false; s.vendors = a.payload.vendors; s.total = a.payload.total; })
      .addCase(fetchVendors.rejected,   (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchVendorStats.pending,   (s) => { s.statsLoading = true; })
      .addCase(fetchVendorStats.fulfilled, (s, a) => { s.statsLoading = false; s.stats = a.payload; })
      .addCase(fetchVendorStats.rejected,  (s, a) => { s.statsLoading = false; s.error = a.payload; })

      .addCase(createVendor.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(createVendor.fulfilled, (s, a) => {
        s.actionLoading = false; s.vendors.unshift(a.payload); s.total += 1; s.stats.total += 1;
        if (a.payload.status === "Active")    s.stats.active    += 1;
        if (a.payload.status === "Pending")   s.stats.pending   += 1;
        if (a.payload.status === "Suspended") s.stats.suspended += 1;
        s.actionSuccess = "Vendor created successfully";
      })
      .addCase(createVendor.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; })

      .addCase(updateVendor.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(updateVendor.fulfilled, (s, a) => {
        s.actionLoading = false;
        const idx = s.vendors.findIndex((v) => v._id === a.payload._id);
        if (idx !== -1) {
          const old = s.vendors[idx];
          if (old.status !== a.payload.status) {
            if (old.status === "Active")    s.stats.active    = Math.max(0, s.stats.active    - 1);
            if (old.status === "Pending")   s.stats.pending   = Math.max(0, s.stats.pending   - 1);
            if (old.status === "Suspended") s.stats.suspended = Math.max(0, s.stats.suspended - 1);
            if (a.payload.status === "Active")    s.stats.active    += 1;
            if (a.payload.status === "Pending")   s.stats.pending   += 1;
            if (a.payload.status === "Suspended") s.stats.suspended += 1;
          }
          s.vendors[idx] = a.payload;
        }
        s.actionSuccess = "Vendor updated successfully";
      })
      .addCase(updateVendor.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; })

      .addCase(deleteVendor.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(deleteVendor.fulfilled, (s, a) => {
        s.actionLoading = false;
        const removed = s.vendors.find((v) => v._id === a.payload);
        if (removed) {
          if (removed.status === "Active")    s.stats.active    = Math.max(0, s.stats.active    - 1);
          if (removed.status === "Pending")   s.stats.pending   = Math.max(0, s.stats.pending   - 1);
          if (removed.status === "Suspended") s.stats.suspended = Math.max(0, s.stats.suspended - 1);
          s.stats.total = Math.max(0, s.stats.total - 1);
          s.total       = Math.max(0, s.total       - 1);
        }
        s.vendors = s.vendors.filter((v) => v._id !== a.payload);
        s.actionSuccess = "Vendor deleted successfully";
      })
      .addCase(deleteVendor.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; });
  },
});

export const { clearActionState } = vendorSlice.actions;
export default vendorSlice.reducer;
