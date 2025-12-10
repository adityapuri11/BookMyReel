import React, { useEffect, useState } from "react";
import ReleaseCard from "../components/ReleaseCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2";

const Releases = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            accept: "application/json",
          },
        });
        const data = await res.json();

        const allMovies = data.results || [];

        const today = new Date();

        // Sort: upcoming first, then past
        allMovies.sort((a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);

          // Future first
          if (dateA >= today && dateB < today) return -1;
          if (dateA < today && dateB >= today) return 1;

          // Otherwise, sort ascending
          return dateA - dateB;
        });

        setMovies(allMovies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  // Separate past and upcoming for headings (optional)
  const today = new Date().toISOString().split("T")[0];
  const upcoming = movies.filter(m => m.release_date >= today);
  const past = movies.filter(m => m.release_date < today);

  return (
    <div className="px-10 py-20 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-8">Upcoming Releases</h1>
      {upcoming.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center mb-12">
          {upcoming.map((movie) => (
            <ReleaseCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No upcoming movies found.</p>
      )}

      <h1 className="text-3xl font-bold mb-8">Past Releases</h1>
      {past.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {past.map((movie) => (
            <ReleaseCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No past movies found.</p>
      )}
    </div>
  );
};

export default Releases;
