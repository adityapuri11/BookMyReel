import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [theatersLoading, setTheatersLoading] = useState(false);
  const [theatersError, setTheatersError] = useState("");

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  
  const fetchIsAdmin = async () => {
    try {
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setIsAdmin(data.isAdmin);

      if (!data.isAdmin && location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("You are not authorized to access admin dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ===================== Fetch Shows =====================
  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const fetchFavoriteMovies = async () => {
    try {
      const { data } = await axios.get("/api/user/favorites", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setFavoriteMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ===================== Theaters =====================
  // Haversine formula to calculate distance in km
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchNearbyTheaters = (radius = 50000) => {
    setTheatersLoading(true);
    if (!navigator.geolocation) {
      setTheatersError("Geolocation is not supported by your browser.");
      setTheatersLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const query = `
            [out:json];
            node(around:${radius},${latitude},${longitude})["amenity"="cinema"];
            out;
          `;
          const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
            query
          )}`;

          const res = await fetch(url);
          const data = await res.json();

          const theatersWithDistance = data.elements.map((el) => ({
            id: el.id,
            name: el.tags.name || "Unnamed Cinema",
            lat: el.lat,
            lon: el.lon,
            distance: getDistance(
              latitude,
              longitude,
              el.lat,
              el.lon
            ).toFixed(2),
          }));

          theatersWithDistance.sort((a, b) => a.distance - b.distance);
          setTheaters(theatersWithDistance);
        } catch (err) {
          console.error(err);
          setTheatersError("Failed to fetch theaters.");
        } finally {
          setTheatersLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setTheatersError("Permission denied for location.");
        setTheatersLoading(false);
      }
    );
  };

  // ===================== useEffect =====================
  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    }
  }, [user]);

  const value = {
    axios,
    fetchIsAdmin,
    user,
    getToken,
    navigate,
    isAdmin,
    shows,
    favoriteMovies,
    fetchFavoriteMovies,
    image_base_url,
    theaters,
    theatersLoading,
    theatersError,
    fetchNearbyTheaters,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
