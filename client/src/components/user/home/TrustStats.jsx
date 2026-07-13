import { Star, Users } from "lucide-react";

/**
 * TrustStats — "4.8 Service Rating" and "12M+ Customers Globally" row.
 */
export default function TrustStats() {
  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        <Star size={22} className="text-gray-900" />
        <div className="leading-tight">
          <p className="text-sm font-bold text-gray-900">4.8</p>
          <p className="text-[11px] text-gray-500">Service Rating*</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Users size={22} className="text-gray-900" />
        <div className="leading-tight">
          <p className="text-sm font-bold text-gray-900">12M+</p>
          <p className="text-[11px] text-gray-500">Customers Globally*</p>
        </div>
      </div>
    </div>
  );
}
