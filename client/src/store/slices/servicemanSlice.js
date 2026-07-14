import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import servicemanApi from "@/services/servicemanApi";

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchServicemen = createAsyncThunk(
  "servicemen/fetchAll",
  async ({ token, search, status, page }, { rejectWithValue }) => {
    try { return await servicemanApi.getAll(token, { search, status, page }); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const fetchServicemanStats = createAsyncThunk(
  "servicemen/fetchStats",
  async (token, { rejectWithValue }) => {
    try { return (await servicemanApi.getStats(token)).stats; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const createServiceman = createAsyncThunk(
  "servicemen/create",
  async ({ token, servicemanData }, { rejectWithValue }) => {
    try { return (await servicemanApi.create(token, servicemanData)).serviceman; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const updateServiceman = createAsyncThunk(
  "servicemen/update",
  async ({ token, id, servicemanData }, { rejectWithValue }) => {
    try { return (await servicemanApi.update(token, id, servicemanData)).serviceman; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const deleteServiceman = createAsyncThunk(
  "servicemen/delete",
  async ({ token, id }, { rejectWithValue }) => {
    try { await servicemanApi.remove(token, id); return id; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  servicemen: [], total: 0,
  stats: { total: 0, verified: 0, pending: 0, suspended: 0 },
  loading: false, statsLoading: false, error: null,
  actionLoading: false, actionError: null, actionSuccess: null,
};

const servicemanSlice = createSlice({
  name: "servicemen",
  initialState,
  reducers: {
    clearActionState(state) { state.actionError = null; state.actionSuccess = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicemen.pending,    (s) => { s.loading = true; s.error = null; })
      .addCase(fetchServicemen.fulfilled,  (s, a) => { s.loading = false; s.servicemen = a.payload.servicemen; s.total = a.payload.total; })
      .addCase(fetchServicemen.rejected,   (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchServicemanStats.pending,   (s) => { s.statsLoading = true; })
      .addCase(fetchServicemanStats.fulfilled, (s, a) => { s.statsLoading = false; s.stats = a.payload; })
      .addCase(fetchServicemanStats.rejected,  (s, a) => { s.statsLoading = false; s.error = a.payload; })

      .addCase(createServiceman.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(createServiceman.fulfilled, (s, a) => {
        s.actionLoading = false; s.servicemen.unshift(a.payload); s.total += 1; s.stats.total += 1;
        if (a.payload.status === "Verified")  s.stats.verified  += 1;
        if (a.payload.status === "Pending")   s.stats.pending   += 1;
        if (a.payload.status === "Suspended") s.stats.suspended += 1;
        s.actionSuccess = "Serviceman created successfully";
      })
      .addCase(createServiceman.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; })

      .addCase(updateServiceman.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(updateServiceman.fulfilled, (s, a) => {
        s.actionLoading = false;
        const idx = s.servicemen.findIndex((x) => x._id === a.payload._id);
        if (idx !== -1) {
          const old = s.servicemen[idx];
          if (old.status !== a.payload.status) {
            if (old.status === "Verified")  s.stats.verified  = Math.max(0, s.stats.verified  - 1);
            if (old.status === "Pending")   s.stats.pending   = Math.max(0, s.stats.pending   - 1);
            if (old.status === "Suspended") s.stats.suspended = Math.max(0, s.stats.suspended - 1);
            if (a.payload.status === "Verified")  s.stats.verified  += 1;
            if (a.payload.status === "Pending")   s.stats.pending   += 1;
            if (a.payload.status === "Suspended") s.stats.suspended += 1;
          }
          s.servicemen[idx] = a.payload;
        }
        s.actionSuccess = "Serviceman updated successfully";
      })
      .addCase(updateServiceman.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; })

      .addCase(deleteServiceman.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(deleteServiceman.fulfilled, (s, a) => {
        s.actionLoading = false;
        const removed = s.servicemen.find((x) => x._id === a.payload);
        if (removed) {
          if (removed.status === "Verified")  s.stats.verified  = Math.max(0, s.stats.verified  - 1);
          if (removed.status === "Pending")   s.stats.pending   = Math.max(0, s.stats.pending   - 1);
          if (removed.status === "Suspended") s.stats.suspended = Math.max(0, s.stats.suspended - 1);
          s.stats.total = Math.max(0, s.stats.total - 1);
          s.total       = Math.max(0, s.total       - 1);
        }
        s.servicemen = s.servicemen.filter((x) => x._id !== a.payload);
        s.actionSuccess = "Serviceman deleted successfully";
      })
      .addCase(deleteServiceman.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; });
  },
});

export const { clearActionState } = servicemanSlice.actions;
export default servicemanSlice.reducer;
