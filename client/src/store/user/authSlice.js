import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAuthApi } from "@/lib/userApi";

const TOKEN_KEY = "user_token";
const USER_KEY = "user_profile";

/* -------------------- persistence helpers -------------------- */

function persist(token, user) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // cookie lets proxy.js gate /user/account & /user/bookings server-side
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
    const user = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

/* -------------------- thunks -------------------- */

// Step 1: request an OTP for a phone number.
export const requestOtp = createAsyncThunk(
  "userAuth/requestOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const data = await userAuthApi.requestOtp(phone);
      return { phone, devOtp: data.otp }; // devOtp only present in dev
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Step 2: verify the OTP and log in.
export const verifyOtp = createAsyncThunk(
  "userAuth/verifyOtp",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const data = await userAuthApi.verifyOtp(phone, otp);
      persist(data.token, data.user);
      return data; // { token, user }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update own profile (name / email / etc.).
export const updateProfile = createAsyncThunk(
  "userAuth/updateProfile",
  async (body, { getState, rejectWithValue }) => {
    try {
      const token = getState().userAuth.token;
      const data = await userAuthApi.updateMe(token, body);
      persist(token, data.user);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* -------------------- slice -------------------- */

const initialState = {
  user: null,
  token: null,
  hydrated: false,
  otpSent: false,
  phone: "",
  devOtp: null, // dev convenience: shows the OTP on screen
  status: "idle", // idle | sending | verifying | saving
  error: null,
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    hydrate(state) {
      const { token, user } = readPersisted();
      state.token = token;
      state.user = user;
      state.hydrated = true;
    },
    logout(state) {
      clearPersisted();
      state.token = null;
      state.user = null;
      state.otpSent = false;
      state.phone = "";
      state.devOtp = null;
      state.error = null;
    },
    resetOtpFlow(state) {
      state.otpSent = false;
      state.devOtp = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // request OTP
      .addCase(requestOtp.pending, (state) => {
        state.status = "sending";
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, (state, action) => {
        state.status = "idle";
        state.otpSent = true;
        state.phone = action.payload.phone;
        state.devOtp = action.payload.devOtp || null;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload || action.error.message;
      })
      // verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.status = "verifying";
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.otpSent = false;
        state.devOtp = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload || action.error.message;
      })
      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.status = "saving";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { hydrate, logout, resetOtpFlow } = authSlice.actions;
export default authSlice.reducer;
