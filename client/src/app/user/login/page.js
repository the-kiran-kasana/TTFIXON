"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Phone, ShieldCheck, ArrowLeft } from "lucide-react";
import {
  requestOtp,
  verifyOtp,
  resetOtpFlow,
} from "@/store/user/authSlice";

// useSearchParams() forces client-side rendering up to the nearest Suspense
// boundary, so the inner form is wrapped in <Suspense> to avoid a hydration
// mismatch with the prerendered shell.
export default function UserLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginFallback() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-400 shadow-sm">
        Loading…
      </div>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { token, otpSent, phone, devOtp, status, error, hydrated } =
    useSelector((state) => state.userAuth);

  const [phoneInput, setPhoneInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [localError, setLocalError] = useState("");

  // Where to go after login (e.g. ?redirect=/user/bookings).
  const redirectTo = searchParams.get("redirect") || "/user";

  // Already logged in? Bounce to the panel.
  useEffect(() => {
    if (hydrated && token) router.replace(redirectTo);
  }, [hydrated, token, redirectTo, router]);

  const sending = status === "sending";
  const verifying = status === "verifying";
  const shownError = localError || error;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!/^[0-9]{10}$/.test(phoneInput)) {
      setLocalError("Enter a valid 10-digit phone number");
      return;
    }
    dispatch(requestOtp(phoneInput));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (!/^[0-9]{4,6}$/.test(otpInput)) {
      setLocalError("Enter the OTP you received");
      return;
    }
    const result = await dispatch(verifyOtp({ phone, otp: otpInput }));
    if (verifyOtp.fulfilled.match(result)) {
      router.replace(redirectTo);
    }
  };

  const handleChangeNumber = () => {
    setOtpInput("");
    setLocalError("");
    dispatch(resetOtpFlow());
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
            {otpSent ? <ShieldCheck size={22} /> : <Phone size={22} />}
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {otpSent ? "Verify OTP" : "Login / Sign up"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {otpSent
              ? `We sent a code to +91 ${phone}`
              : "Enter your phone number to continue"}
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="flex items-center rounded-lg border border-gray-200 focus-within:border-gray-400">
                <span className="px-3 text-sm text-gray-500">+91</span>
                <input
                  autoFocus
                  inputMode="numeric"
                  maxLength={10}
                  value={phoneInput}
                  onChange={(e) =>
                    setPhoneInput(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="10-digit phone"
                  className="w-full rounded-r-lg py-2.5 pr-3 text-sm outline-none"
                />
              </div>
            </div>

            {shownError && (
              <p className="text-sm text-red-600">{shownError}</p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
            >
              {sending ? "Sending OTP…" : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                autoFocus
                inputMode="numeric"
                maxLength={6}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                placeholder="••••••"
                className="w-full rounded-lg border border-gray-200 py-2.5 px-3 text-center text-lg tracking-[0.5em] outline-none focus:border-gray-400"
              />
              {devOtp && (
                <p className="mt-2 text-center text-xs text-gray-400">
                  Dev OTP:{" "}
                  <span className="font-mono font-semibold">{devOtp}</span>
                </p>
              )}
            </div>

            {shownError && (
              <p className="text-sm text-red-600">{shownError}</p>
            )}

            <button
              type="submit"
              disabled={verifying}
              className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
            >
              {verifying ? "Verifying…" : "Verify & Continue"}
            </button>

            <button
              type="button"
              onClick={handleChangeNumber}
              className="flex w-full items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-800"
            >
              <ArrowLeft size={14} /> Change number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
