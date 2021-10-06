import React from "react";
import { useUserLocation } from "../contexts/LocationContext";
import { getDistanceFromLatLonInKm } from "../utils/mapUtils";

interface Props {
  renderInside: React.ReactNode;
  renderOutside: React.ReactNode;
  renderNoLocationServices?: React.ReactNode;
  lat: number;
  lng: number;
  maximumDistance: number;
}

/**
 * Display certain content only when user is within a certain distance of a location
 */
export default function LocationRestricted({
  renderInside,
  renderOutside,
  renderNoLocationServices,
  lat,
  lng,
  maximumDistance
}: Props) {
  const userLocation = useUserLocation();

  if (!userLocation) {
    return renderNoLocationServices === undefined ? (
      <>{renderOutside}</>
    ) : (
      <>{renderNoLocationServices}</>
    );
  }

  const { latitude, longitude } = userLocation.coords;
  const distance = getDistanceFromLatLonInKm(lat, lng, latitude, longitude);
  if (distance <= maximumDistance) {
    return <>{renderInside}</>;
  } else {
    return <>{renderOutside}</>;
  }
}
