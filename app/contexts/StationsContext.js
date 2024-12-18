"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllStationsApi } from "../utils/api";

export const StationsContext = createContext();

export const StationsProvider = ({ children }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await getAllStationsApi();
        const sortedData = data.data.sort(
          (a, b) => a.order_index - b.order_index
        );
        setStations(sortedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return (
    <StationsContext.Provider value={{ stations, loading, error }}>
      {children}
    </StationsContext.Provider>
  );
};

export const useStations = () => {
  return useContext(StationsContext);
};
