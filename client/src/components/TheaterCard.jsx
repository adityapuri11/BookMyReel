import React from "react";
import { MapPinIcon, ClockIcon } from "lucide-react";

const TheaterCard = ({ theater }) => {
  return (
    <div className="relative bg-gray-800 rounded-xl w-64 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <img
        src={theater.image || "https://via.placeholder.com/256x160"} // fallback image
        alt={theater.name || "Theater"}
        className="w-full h-40 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="p-4 relative z-10">
        <h2 className="text-white font-semibold text-lg truncate">
          {theater.name || "Unknown Theater"}
        </h2>
        <p className="flex items-center text-gray-300 text-sm gap-1">
          <MapPinIcon className="w-4 h-4" /> {theater.distance || "N/A"} km away
        </p>
        <p className="flex items-center text-gray-300 text-sm gap-1">
          <ClockIcon className="w-4 h-4" /> {theater.opening_hours || "Timing not available"}
        </p>
      </div>
    </div>
  );
};

export default TheaterCard;
