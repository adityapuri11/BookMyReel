import React, { useEffect } from "react";
import BlurCircle from "../components/BlurCircle";
import TheaterCard from "../components/TheaterCard";
import { useAppContext } from "../context/AppContext";

const Theaters = () => {
  const { theaters, theatersLoading, theatersError, fetchNearbyTheaters } = useAppContext();

  // Fetch theaters on component mount
  useEffect(() => {
    fetchNearbyTheaters();
  }, []);

  if (theatersLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading nearby theaters...</p>
      </div>
    );

  if (theatersError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{theatersError}</p>
      </div>
    );

  if (!theaters.length)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No theaters found nearby.</p>
      </div>
    );

  return (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 overflow-hidden min-h-[80vh]">
      {/* Decorative blur circles */}
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="150px" right="0px" />

      <h1 className="text-lg font-medium my-4">Nearby Theaters</h1>

      <div className="flex flex-wrap gap-8 justify-center">
        {theaters.map((theater) => (
          <TheaterCard theater={theater} key={theater.id} />
        ))}
      </div>
    </div>
  );
};

export default Theaters;
