"use client";

import { useState } from "react";
import { Home, Briefcase, MapPin } from "lucide-react";

const TAGS = [
  { key: "home", label: "Home", icon: Home },
  { key: "work", label: "Work", icon: Briefcase },
  { key: "other", label: "Other", icon: MapPin },
];

/**
 * AddressForm — add / edit a delivery address.
 *
 * @param {object}   props
 * @param {object}   [props.initialValue]  existing address to edit
 * @param {Function} props.onSave          (address) => void
 * @param {Function} [props.onCancel]      () => void
 */
export default function AddressForm({ initialValue, onSave, onCancel }) {
  const [form, setForm] = useState({
    tag: "home",
    houseNo: "",
    building: "",
    landmark: "",
    area: "",
    pincode: "",
    receiverName: "",
    receiverPhone: "",
    ...initialValue,
  });
  const [errors, setErrors] = useState({});

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.houseNo.trim()) next.houseNo = "House / flat no. is required";
    if (!form.area.trim()) next.area = "Area / locality is required";
    if (!/^\d{6}$/.test(form.pincode)) next.pincode = "Enter a valid 6-digit pincode";
    if (form.receiverPhone && !/^\d{10}$/.test(form.receiverPhone))
      next.receiverPhone = "Enter a valid 10-digit phone";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* address tag */}
      <div className="flex gap-2">
        {TAGS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setForm((p) => ({ ...p, tag: key }))}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition ${
              form.tag === key
                ? "border-black bg-black text-white"
                : "border-gray-300 text-gray-600 hover:border-gray-400"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      <Field
        label="House / Flat / Block no."
        value={form.houseNo}
        onChange={update("houseNo")}
        error={errors.houseNo}
        placeholder="e.g. H-37, 2nd Floor"
      />
      <Field
        label="Apartment / Building (optional)"
        value={form.building}
        onChange={update("building")}
        placeholder="e.g. Green Residency"
      />

      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Area / Locality"
          value={form.area}
          onChange={update("area")}
          error={errors.area}
          placeholder="e.g. Saket"
        />
        <Field
          label="Pincode"
          value={form.pincode}
          onChange={update("pincode")}
          error={errors.pincode}
          placeholder="110017"
          inputMode="numeric"
          maxLength={6}
        />
      </div>

      <Field
        label="Landmark (optional)"
        value={form.landmark}
        onChange={update("landmark")}
        placeholder="e.g. Near Select Citywalk"
      />

      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Receiver's name (optional)"
          value={form.receiverName}
          onChange={update("receiverName")}
          placeholder="Full name"
        />
        <Field
          label="Receiver's phone (optional)"
          value={form.receiverPhone}
          onChange={update("receiverPhone")}
          error={errors.receiverPhone}
          placeholder="10-digit number"
          inputMode="numeric"
          maxLength={10}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-black py-3 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Save address
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function Field({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-500">{label}</span>
      <input
        {...props}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-black ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
