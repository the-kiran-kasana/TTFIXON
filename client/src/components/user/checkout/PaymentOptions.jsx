"use client";

import { useState } from "react";
import { Smartphone, CreditCard, Wallet, Banknote, Check } from "lucide-react";

/**
 * PaymentOptions — choose a payment method at checkout.
 *
 * @param {object}   props
 * @param {string}   [props.value]      controlled selected method key
 * @param {Function} props.onChange     (methodKey) => void
 * @param {number}   [props.walletBalance=0]
 */
const METHODS = [
  { key: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm & more", icon: Smartphone },
  { key: "card", label: "Credit / Debit card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
  { key: "wallet", label: "Wallet", desc: "Use your OD balance", icon: Wallet },
  { key: "cod", label: "Pay after service", desc: "Cash / online after the job", icon: Banknote },
];

export default function PaymentOptions({ value, onChange, walletBalance = 0 }) {
  const [internal, setInternal] = useState(value || "upi");
  const selected = value ?? internal;

  const select = (key) => {
    setInternal(key);
    onChange?.(key);
  };

  return (
    <div className="space-y-2.5">
      {METHODS.map(({ key, label, desc, icon: Icon }) => {
        const active = selected === key;
        const isWallet = key === "wallet";
        return (
          <button
            key={key}
            type="button"
            onClick={() => select(key)}
            className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
              active ? "border-black ring-1 ring-black" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="rounded-lg bg-gray-100 p-2 text-gray-700">
              <Icon size={18} />
            </span>

            <span className="flex-1">
              <span className="block text-sm font-semibold text-gray-900">{label}</span>
              <span className="block text-xs text-gray-500">
                {isWallet ? `Balance: ₹${walletBalance}` : desc}
              </span>
            </span>

            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                active ? "border-black bg-black text-white" : "border-gray-300"
              }`}
            >
              {active && <Check size={13} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
