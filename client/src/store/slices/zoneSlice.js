import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import zoneApi from "@/services/zoneApi";

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchZones = createAsyncThunk(
  "zones/fetchAll",
  async ({ token, search, status }, { rejectWithValue }) => {
    try { return await zoneApi.getAll(token, { search, status }); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const fetchZoneStats = createAsyncThunk(
  "zones/fetchStats",
  async (token, { rejectWithValue }) => {
    try { return (await zoneApi.getStats(token)).stats; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const createZone = createAsyncThunk(
  "zones/create",
  async ({ token, zoneData }, { rejectWithValue }) => {
    try { return (await zoneApi.create(token, zoneData)).zone; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const updateZone = createAsyncThunk(
  "zones/update",
  async ({ token, id, zoneData }, { rejectWithValue }) => {
    try { return (await zoneApi.update(token, id, zoneData)).zone; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const deleteZone = createAsyncThunk(
  "zones/delete",
  async ({ token, id }, { rejectWithValue }) => {
    try { await zoneApi.remove(token, id); return id; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  zones: [], total: 0,
  stats: { total: 0, active: 0, inactive: 0 },
  loading: false, statsLoading: false, error: null,
  actionLoading: false, actionError: null, actionSuccess: null,
};

const zoneSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {
    clearActionState(state) { state.actionError = null; state.actionSuccess = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZones.pending,    (s) => { s.loading = true; s.error = null; })
      .addCase(fetchZones.fulfilled,  (s, a) => { s.loading = false; s.zones = a.payload.zones; s.total = a.payload.total; })
      .addCase(fetchZones.rejected,   (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchZoneStats.pending,   (s) => { s.statsLoading = true; })
      .addCase(fetchZoneStats.fulfilled, (s, a) => { s.statsLoading = false; s.stats = a.payload; })
      .addCase(fetchZoneStats.rejected,  (s, a) => { s.statsLoading = false; s.error = a.payload; })

      .addCase(createZone.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(createZone.fulfilled, (s, a) => {
        s.actionLoading = false; s.zones.unshift(a.payload); s.total += 1; s.stats.total += 1;
        if (a.payload.status === "Active") s.stats.active += 1; else s.stats.inactive += 1;
        s.actionSuccess = "Zone created successfully";
      })
      .addCase(createZone.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; })

      .addCase(updateZone.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(updateZone.fulfilled, (s, a) => {
        s.actionLoading = false;
        const idx = s.zones.findIndex((z) => z._id === a.payload._id);
        if (idx !== -1) {
          const old = s.zones[idx];
          if (old.status !== a.payload.status) {
            if (old.status === "Active") s.stats.active = Math.max(0, s.stats.active - 1); else s.stats.inactive = Math.max(0, s.stats.inactive - 1);
            if (a.payload.status === "Active") s.stats.active += 1; else s.stats.inactive += 1;
          }
          s.zones[idx] = a.payload;
        }
        s.actionSuccess = "Zone updated successfully";
      })
      .addCase(updateZone.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; })

      .addCase(deleteZone.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(deleteZone.fulfilled, (s, a) => {
        s.actionLoading = false;
        const removed = s.zones.find((z) => z._id === a.payload);
        if (removed) {
          if (removed.status === "Active") s.stats.active = Math.max(0, s.stats.active - 1); else s.stats.inactive = Math.max(0, s.stats.inactive - 1);
          s.stats.total = Math.max(0, s.stats.total - 1); s.total = Math.max(0, s.total - 1);
        }
        s.zones = s.zones.filter((z) => z._id !== a.payload);
        s.actionSuccess = "Zone deleted successfully";
      })
      .addCase(deleteZone.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; });
  },
});

export const { clearActionState } = zoneSlice.actions;
export default zoneSlice.reducer;
