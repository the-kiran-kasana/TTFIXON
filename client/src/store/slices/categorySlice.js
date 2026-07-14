import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "@/services/categoryApi";

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async ({ token, search }, { rejectWithValue }) => {
    try { return await categoryApi.getAll(token, { search }); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const fetchCategoryStats = createAsyncThunk(
  "categories/fetchStats",
  async (token, { rejectWithValue }) => {
    try { return (await categoryApi.getStats(token)).stats; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const createCategory = createAsyncThunk(
  "categories/create",
  async ({ token, categoryData }, { rejectWithValue }) => {
    try { return (await categoryApi.create(token, categoryData)).category; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ token, id, categoryData }, { rejectWithValue }) => {
    try { return (await categoryApi.update(token, id, categoryData)).category; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async ({ token, id }, { rejectWithValue }) => {
    try { await categoryApi.remove(token, id); return id; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const toggleCategory = createAsyncThunk(
  "categories/toggle",
  async ({ token, id }, { rejectWithValue }) => {
    try { return (await categoryApi.toggle(token, id)).category; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  categories: [], total: 0,
  stats: { total: 0, active: 0, inactive: 0 },
  loading: false, statsLoading: false, error: null,
  actionLoading: false, actionError: null, actionSuccess: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearActionState(state) { state.actionError = null; state.actionSuccess = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending,    (s) => { s.loading = true; s.error = null; })
      .addCase(fetchCategories.fulfilled,  (s, a) => { s.loading = false; s.categories = a.payload.categories; s.total = a.payload.total; })
      .addCase(fetchCategories.rejected,   (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(fetchCategoryStats.pending,   (s) => { s.statsLoading = true; })
      .addCase(fetchCategoryStats.fulfilled, (s, a) => { s.statsLoading = false; s.stats = a.payload; })
      .addCase(fetchCategoryStats.rejected,  (s, a) => { s.statsLoading = false; s.error = a.payload; })

      .addCase(createCategory.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(createCategory.fulfilled, (s, a) => {
        s.actionLoading = false; s.categories.unshift(a.payload); s.total += 1; s.stats.total += 1;
        if (a.payload.active) s.stats.active += 1; else s.stats.inactive += 1;
        s.actionSuccess = "Category created successfully";
      })
      .addCase(createCategory.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; })

      .addCase(updateCategory.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(updateCategory.fulfilled, (s, a) => {
        s.actionLoading = false;
        const idx = s.categories.findIndex((c) => c._id === a.payload._id);
        if (idx !== -1) {
          const old = s.categories[idx];
          if (old.active !== a.payload.active) {
            if (old.active) s.stats.active = Math.max(0, s.stats.active - 1); else s.stats.inactive = Math.max(0, s.stats.inactive - 1);
            if (a.payload.active) s.stats.active += 1; else s.stats.inactive += 1;
          }
          s.categories[idx] = a.payload;
        }
        s.actionSuccess = "Category updated successfully";
      })
      .addCase(updateCategory.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; })

      .addCase(deleteCategory.pending,   (s) => { s.actionLoading = true; s.actionError = null; s.actionSuccess = null; })
      .addCase(deleteCategory.fulfilled, (s, a) => {
        s.actionLoading = false;
        const removed = s.categories.find((c) => c._id === a.payload);
        if (removed) {
          if (removed.active) s.stats.active = Math.max(0, s.stats.active - 1); else s.stats.inactive = Math.max(0, s.stats.inactive - 1);
          s.stats.total = Math.max(0, s.stats.total - 1); s.total = Math.max(0, s.total - 1);
        }
        s.categories = s.categories.filter((c) => c._id !== a.payload);
        s.actionSuccess = "Category deleted successfully";
      })
      .addCase(deleteCategory.rejected,  (s, a) => { s.actionLoading = false; s.actionError = a.payload; })

      .addCase(toggleCategory.fulfilled, (s, a) => {
        const idx = s.categories.findIndex((c) => c._id === a.payload._id);
        if (idx !== -1) {
          const old = s.categories[idx];
          if (old.active !== a.payload.active) {
            if (old.active) s.stats.active = Math.max(0, s.stats.active - 1); else s.stats.inactive = Math.max(0, s.stats.inactive - 1);
            if (a.payload.active) s.stats.active += 1; else s.stats.inactive += 1;
          }
          s.categories[idx] = a.payload;
        }
      })
      .addCase(toggleCategory.rejected, (s, a) => { s.error = a.payload; });
  },
});

export const { clearActionState } = categorySlice.actions;
export default categorySlice.reducer;
