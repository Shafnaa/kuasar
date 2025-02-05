import React from "react";
import axios, { AxiosInstance } from "axios";

type AxiosContextType = {
  publicAxios: AxiosInstance;
};

const axiosContext = React.createContext<AxiosContextType>({
  publicAxios: axios.create(),
});

export function useAxios() {
  const context = React.useContext(axiosContext);

  if (!context) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }

  return context;
}

function AxiosProvider({ children }: { children: React.ReactNode }) {
  const publicAxios = axios.create({
    baseURL: import.meta.env.VITE_EXPRESS_URL,
  });

  return (
    <axiosContext.Provider value={{ publicAxios }}>
      {children}
    </axiosContext.Provider>
  );
}

export default AxiosProvider;
