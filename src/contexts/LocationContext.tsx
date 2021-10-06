import * as Location from "expo-location";
import React, { useState, useEffect, useContext } from "react";

const LocationContext = React.createContext<Location.LocationData | undefined>(
  undefined
);

/**
 * A hook to easily get the user location.
 */
export function useUserLocation() {
  return useContext(LocationContext);
}

interface Props {
  children: React.ReactNode;
}

export default function LocationProvider({ children }: Props) {
  const [userLocation, setUserLocation] = useState<Location.LocationData>();

  useEffect(() => {
    console.log("Asking for location permission");
    Location.requestPermissionsAsync().then(() => {
      Location.watchPositionAsync({}, userLocation => {
        setUserLocation(userLocation);
      });
    });
  });

  return (
    <LocationContext.Provider value={userLocation}>
      {children}
    </LocationContext.Provider>
  );
}
