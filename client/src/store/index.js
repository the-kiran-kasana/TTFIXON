// ─── Store ────────────────────────────────────────────────────────────────────
export { store } from "./store";
export { default as ReduxProvider } from "./ReduxProvider";

// ─── Vendor ───────────────────────────────────────────────────────────────────
export {
  fetchVendors,
  fetchVendorStats,
  createVendor,
  updateVendor,
  deleteVendor,
  clearActionState as clearVendorActionState,
} from "./slices/vendorSlice";

// ─── Serviceman ───────────────────────────────────────────────────────────────
export {
  fetchServicemen,
  fetchServicemanStats,
  createServiceman,
  updateServiceman,
  deleteServiceman,
  clearActionState as clearServicemanActionState,
} from "./slices/servicemanSlice";

// ─── Zone ─────────────────────────────────────────────────────────────────────
export {
  fetchZones,
  fetchZoneStats,
  createZone,
  updateZone,
  deleteZone,
  clearActionState as clearZoneActionState,
} from "./slices/zoneSlice";

// ─── Category ─────────────────────────────────────────────────────────────────
export {
  fetchCategories,
  fetchCategoryStats,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategory,
  clearActionState as clearCategoryActionState,
} from "./slices/categorySlice";
