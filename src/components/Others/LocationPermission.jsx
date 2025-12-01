"use client";

import { useEffect, useState } from "react";

export default function LocationPermission() {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation not supported in this browser");
    }
  }, []);

  return null;
}
