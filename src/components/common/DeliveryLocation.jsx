import React from "react";
import { MapPin, ChevronDown } from "lucide-react";



export default function DeliveringTo({ place = "New York", onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-3 h-10 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer group"
    >
      <MapPin size={16} className="text-red-500 flex-shrink-0" />
      <div className="flex flex-col items-start text-left">
        <span className="text-xs text-white/70 font-medium">Delivering to</span>
        <span className="text-sm text-white font-semibold">{place}</span>
      </div>
      <ChevronDown size={14} className="text-white/70 group-hover:text-white transition-colors" />
    </button>
  );
}
