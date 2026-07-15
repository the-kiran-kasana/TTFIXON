import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAuthApi from "@/services/userAuthApi";

const TOKEN_KEY = "user_token";
const USER_KEY  = "user_profile";

/* ── persistence helpers ─────────────────────────────────────────────────── */
function persist(token, user) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  const maxAge = 7 * 24 * 60 * 60;
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${maxAge}; samesite=lax`;
}

function clearPersisted() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

function readPersisted() {
  if (typeof window === "undefined") return { token: null, user: null };
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const user  = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    return { token, user };
  } catch { return { token: null, user: null }; }
}

/* ── thunks ──────────────────────────────────────────────────────────────── */
export const requestOtp = createAsyncThunk(
  "userAuth/requestOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const data = await userAuthApi.requestOtp(phone);
      return { phone, devOtp: data.otp };
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const verifyOtp = createAsyncThunk(
  "userAuth/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const data = await userAuthApi.verifyOtp(phone, otp);
      persist(data.token, data.user);
      return data;
    } catch (err) { return rejectWithValue(err.message); }
  }
);

export const updateProfile = createAsyncThunk(
  "userAuth/updateProfile",
  async (body, { getState, rejectWithValue }) => {
    try {
      const token = getState().userAuth.token;
      const data  = await userAuthApi.updateMe(token, body);
      persist(token, data.user);
      return data.user;
    } catch (err) { return rejectWithValue(err.message); }
  }
);

/* ── slice ───────────────────────────────────────────────────────────────── */
const initialState = {
  user: null, token: null, hydrated: false,
  otpSent: false, phone: "", devOtp: null,
  status: "idle", // idle | sending | verifying | saving
  error: null,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    hydrate(state) {
      const { token, user } = readPersisted();
      state.token    = token;
      state.user     = user;
      state.hydrated = true;
    },
    logout(state) {
      clearPersisted();
      state.token   = null; state.user = null;
      state.otpSent = false; state.phone = ""; state.devOtp = null; state.error = null;
    },
    resetOtpFlow(state) {
      state.otpSent = false; state.devOtp = null; state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtp.pending,   (s) => { s.status = "sending";    s.error = null; })
      .addCase(requestOtp.fulfilled, (s, a) => { s.status = "idle"; s.otpSent = true; s.phone = a.payload.phone; s.devOtp = a.payload.devOtp || null; })
      .addCase(requestOtp.rejected,  (s, a) => { s.status = "idle"; s.error = a.payload || a.error.message; })

      .addCase(verifyOtp.pending,    (s) => { s.status = "verifying";  s.error = null; })
      .addCase(verifyOtp.fulfilled,  (s, a) => { s.status = "idle"; s.token = a.payload.token; s.user = a.payload.user; s.otpSent = false; s.devOtp = null; })
      .addCase(verifyOtp.rejected,   (s, a) => { s.status = "idle"; s.error = a.payload || a.error.message; })

      .addCase(updateProfile.pending,   (s) => { s.status = "saving"; s.error = null; })
      .addCase(updateProfile.fulfilled, (s, a) => { s.status = "idle"; s.user = a.payload; })
      .addCase(updateProfile.rejected,  (s, a) => { s.status = "idle"; s.error = a.payload || a.error.message; });
  },
});

export const { hydrate, logout, resetOtpFlow } = userAuthSlice.actions;
export default userAuthSlice.reducer;
