"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, ArrowLeft, PhoneCall } from "lucide-react";
import { requestOtp, verifyOtp, resetOtpFlow } from "@/store/slices/userAuthSlice";

/**
 * LoginModal — inline modal, no page navigation.
 * Props:
 *   isOpen    : boolean
 *   onClose   : () => void
 *   onSuccess : () => void  (optional, defaults to onClose)
 */
export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const handleSuccess = onSuccess || onClose;
  const dispatch = useDispatch();
  const { otpSent, phone: reduxPhone, devOtp, status, error } =
    useSelector((s) => s.userAuth);

  const [phoneInput, setPhoneInput] = useState("");
  const [digits, setDigits]         = useState(["", "", "", "", "", ""]);
  const [localError, setLocalError] = useState("");

  const phoneRef  = useRef(null);
  const digitRefs = useRef([]);

  const otpValue = digits.join("");

  // Auto-focus correct input when step changes
  useEffect(() => {
    if (!isOpen) return;
    if (otpSent) setTimeout(() => digitRefs.current[0]?.focus(), 80);
    else         setTimeout(() => phoneRef.current?.focus(), 80);
  }, [isOpen, otpSent]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setPhoneInput("");
      setDigits(["", "", "", "", "", ""]);
      setLocalError("");
      dispatch(resetOtpFlow());
    }
  }, [isOpen, dispatch]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sending     = status === "sending";
  const verifying   = status === "verifying";
  const shownError  = localError || error;
  const canContinue = phoneInput.length === 10;
  const canVerify   = otpValue.length === 6;

  /* ── OTP box handlers ─────────────────────────────────────────────────── */

  const handleDigitChange = (idx, val) => {
    const char = val.replace(/\D/g, "").slice(-1); // only last digit typed
    const next = [...digits];
    next[idx] = char;
    setDigits(next);
    setLocalError("");
    // advance focus
    if (char && idx < 5) digitRefs.current[idx + 1]?.focus();
  };

  const handleDigitKeyDown = (idx, e) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        // clear current box
        const next = [...digits]; next[idx] = ""; setDigits(next);
      } else if (idx > 0) {
        // move back
        digitRefs.current[idx - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      digitRefs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < 5) {
      digitRefs.current[idx + 1]?.focus();
    }
  };

  const handleDigitPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((c, i) => { next[i] = c; });
    setDigits(next);
    setLocalError("");
    // focus last filled box or box after last
    const focusIdx = Math.min(pasted.length, 5);
    digitRefs.current[focusIdx]?.focus();
  };

  /* ── auto-fill from dev OTP ───────────────────────────────────────────── */
  const autoFillDevOtp = () => {
    if (!devOtp) return;
    setDigits(devOtp.split("").slice(0, 6));
    setLocalError("");
    digitRefs.current[5]?.focus();
  };

  /* ── form handlers ────────────────────────────────────────────────────── */

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
    if (otpValue.length !== 6) {
      setLocalError("Enter all 6 digits");
      return;
    }
    const result = await dispatch(verifyOtp({ phone: reduxPhone, otp: otpValue }));
    if (verifyOtp.fulfilled.match(result)) handleSuccess();
  };

  const handleBack = () => {
    setDigits(["", "", "", "", "", ""]);
    setLocalError("");
    dispatch(resetOtpFlow());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-[500px] rounded-2xl bg-white px-8 py-9 shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 shadow-sm transition hover:text-gray-900"
        >
          <X size={18} />
        </button>

        {/* ── Step 1: Phone ─────────────────────────────────────────────── */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
              <PhoneCall size={26} className="text-indigo-600" />
            </div>

            <h2 className="mb-1 text-[26px] font-bold text-gray-900">
              Enter your phone number
            </h2>
            <p className="mb-7 text-sm text-gray-500">
              We'll send you a text with a verification code.
              Standard tariff may apply.
            </p>

            <div className="mb-5 flex overflow-hidden rounded-xl border border-gray-200 transition focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100">
              <div className="flex shrink-0 items-center gap-1 border-r border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700">
                +91
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-400">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                ref={phoneRef}
                inputMode="numeric"
                maxLength={10}
                value={phoneInput}
                onChange={(e) => { setLocalError(""); setPhoneInput(e.target.value.replace(/\D/g, "")); }}
                placeholder="Enter your phone number"
                className="w-full bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            {shownError && <p className="mb-3 text-sm text-red-500">{shownError}</p>}

            <button
              type="submit"
              disabled={sending || !canContinue}
              className="w-full rounded-xl py-3.5 text-sm font-semibold transition"
              style={{
                background: canContinue && !sending ? "#111827" : "#e5e7eb",
                color:      canContinue && !sending ? "#fff"     : "#9ca3af",
                cursor:     canContinue && !sending ? "pointer"  : "not-allowed",
              }}
            >
              {sending ? "Sending…" : "Continue"}
            </button>

            <p className="mt-5 text-center text-xs text-gray-400">
              By continuing, you agree to our{" "}
              <span className="cursor-pointer font-semibold text-gray-600 underline decoration-gray-300">T&amp;C</span>
              {" "}and{" "}
              <span className="cursor-pointer font-semibold text-gray-600 underline decoration-gray-300">Privacy</span>
              {" "}policy.
            </p>
          </form>

        ) : (

        /* ── Step 2: OTP ──────────────────────────────────────────────── */
          <form onSubmit={handleVerify}>
            <button
              type="button"
              onClick={handleBack}
              className="mb-5 flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-gray-800"
            >
              <ArrowLeft size={15} /> Change number
            </button>

            <h2 className="mb-1 text-[26px] font-bold text-gray-900">
              Enter verification code
            </h2>
            <p className="mb-7 text-sm text-gray-500">
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-gray-800">+91 {reduxPhone}</span>
            </p>

            {/* ── 6 individual digit boxes ── */}
            <div className="mb-5 flex items-center justify-between gap-2">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (digitRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleDigitKeyDown(i, e)}
                  onPaste={i === 0 ? handleDigitPaste : undefined}
                  className="h-14 w-full rounded-xl border-2 text-center text-xl font-bold text-gray-900 outline-none transition"
                  style={{
                    borderColor: d ? "#6366f1" : "#e5e7eb",
                    background:  d ? "#f5f3ff" : "#fafafa",
                    boxShadow:   d ? "0 0 0 3px rgba(99,102,241,0.08)" : "none",
                  }}
                />
              ))}
            </div>

            {/* ── Dev OTP hint — subtle ── */}
            {devOtp && (
              <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-base">🛠</span>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Dev mode OTP</p>
                    <p className="font-mono text-lg font-bold tracking-[0.3em] text-gray-700">{devOtp}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={autoFillDevOtp}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
                >
                  Fill
                </button>
              </div>
            )}

            {shownError && <p className="mb-3 text-sm text-red-500">{shownError}</p>}

            <button
              type="submit"
              disabled={verifying || !canVerify}
              className="w-full rounded-xl py-3.5 text-sm font-semibold transition"
              style={{
                background: canVerify && !verifying ? "#111827" : "#e5e7eb",
                color:      canVerify && !verifying ? "#fff"     : "#9ca3af",
                cursor:     canVerify && !verifying ? "pointer"  : "not-allowed",
              }}
            >
              {verifying ? "Verifying…" : "Verify & Login"}
            </button>

            <p className="mt-5 text-center text-xs text-gray-400">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleBack}
                className="font-semibold text-gray-600 underline decoration-gray-300 transition hover:text-gray-900"
              >
                Resend OTP
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
