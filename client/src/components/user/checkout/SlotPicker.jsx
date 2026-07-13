"use client";

import { useMemo, useState } from "react";

/**
 * SlotPicker — choose a service date and time slot.
 *
 * @param {object}   props
 * @param {number}   [props.days=7]         how many upcoming days to show
 * @param {string[]} [props.timeSlots]      labels e.g. ["08:00 - 10:00", ...]
 * @param {object}   [props.unavailable]    { "2026-07-14": ["08:00 - 10:00"] }
 * @param {Function} props.onSelect         ({ date, slot }) => void
 */
const DEFAULT_SLOTS = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function SlotPicker({
  days = 7,
  timeSlots = DEFAULT_SLOTS,
  unavailable = {},
  onSelect,
}) {
  // Build the next `days` days starting today. `baseTime` lets callers inject a
  // fixed "now" (SSR-safe); falls back to the browser clock on the client.
  const dateList = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [days]);

  const [activeDate, setActiveDate] = useState(dateList[0]);
  const [activeSlot, setActiveSlot] = useState(null);

  const iso = (d) => d.toISOString().slice(0, 10);
  const blocked = unavailable[iso(activeDate)] || [];

  const pickSlot = (slot) => {
    setActiveSlot(slot);
    onSelect?.({ date: iso(activeDate), slot });
  };

  return (
    <div className="space-y-5">
      {/* date strip */}
      <div>
        <h4 className="mb-2 text-sm font-semibold text-gray-900">Select date</h4>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {dateList.map((d) => {
            const active = iso(d) === iso(activeDate);
            return (
              <button
                key={iso(d)}
                type="button"
                onClick={() => {
                  setActiveDate(d);
                  setActiveSlot(null);
                }}
                className={`flex min-w-[64px] flex-col items-center rounded-xl border px-3 py-2 transition ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="text-[11px] uppercase opacity-70">
                  {WEEKDAYS[d.getDay()]}
                </span>
                <span className="text-lg font-semibold leading-tight">
                  {d.getDate()}
                </span>
                <span className="text-[11px] opacity-70">{MONTHS[d.getMonth()]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* time slots */}
      <div>
        <h4 className="mb-2 text-sm font-semibold text-gray-900">Select time slot</h4>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {timeSlots.map((slot) => {
            const isBlocked = blocked.includes(slot);
            const active = slot === activeSlot;
            return (
              <button
                key={slot}
                type="button"
                disabled={isBlocked}
                onClick={() => pickSlot(slot)}
                className={`rounded-lg border py-2.5 text-sm transition ${
                  isBlocked
                    ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300 line-through"
                    : active
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-700 hover:border-gray-400"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
