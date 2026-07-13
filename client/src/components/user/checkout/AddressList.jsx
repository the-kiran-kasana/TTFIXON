"use client";

import { Home, Briefcase, MapPin, Plus, Pencil } from "lucide-react";

const TAG_ICON = { home: Home, work: Briefcase, other: MapPin };

/**
 * AddressList — pick a saved address or add a new one.
 *
 * @param {object}   props
 * @param {Array}    props.addresses          [{ id, tag, houseNo, area, pincode, ... }]
 * @param {string}   [props.selectedId]       currently chosen address id
 * @param {Function} props.onSelect           (address) => void
 * @param {Function} [props.onEdit]           (address) => void
 * @param {Function} props.onAddNew           () => void
 */
export default function AddressList({
  addresses = [],
  selectedId,
  onSelect,
  onEdit,
  onAddNew,
}) {
  return (
    <div className="space-y-3">
      {addresses.length === 0 && (
        <p className="text-sm text-gray-500">No saved addresses yet.</p>
      )}

      {addresses.map((addr) => {
        const Icon = TAG_ICON[addr.tag] || MapPin;
        const active = addr.id === selectedId;
        return (
          <button
            key={addr.id}
            type="button"
            onClick={() => onSelect?.(addr)}
            className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
              active
                ? "border-black ring-1 ring-black"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="mt-0.5 rounded-lg bg-gray-100 p-2 text-gray-700">
              <Icon size={16} />
            </span>

            <span className="flex-1">
              <span className="flex items-center gap-2">
                <span className="text-sm font-semibold capitalize text-gray-900">
                  {addr.tag}
                </span>
                {active && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                    Selected
                  </span>
                )}
              </span>
              <span className="mt-1 block text-sm text-gray-600">
                {[addr.houseNo, addr.building, addr.area, addr.pincode]
                  .filter(Boolean)
                  .join(", ")}
              </span>
              {addr.landmark && (
                <span className="mt-0.5 block text-xs text-gray-400">
                  Landmark: {addr.landmark}
                </span>
              )}
            </span>

            {onEdit && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(addr);
                }}
                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <Pencil size={15} />
              </span>
            )}
          </button>
        );
      })}

      <button
        type="button"
        onClick={onAddNew}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-50"
      >
        <Plus size={16} />
        Add new address
      </button>
    </div>
  );
}
