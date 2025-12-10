import React from "react";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const ReleaseCard = ({ movie }) => {
  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md w-64">
      <img
        src={movie.poster_path ? IMG_BASE + movie.poster_path : "/no-poster.png"}
        alt={movie.title}
        className="w-full h-96 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          Release Date: {movie.release_date || "TBA"}
        </p>
      </div>
    </div>
  );
};

export default ReleaseCard;
