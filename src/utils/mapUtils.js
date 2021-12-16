export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function coordsToRegion(l) {
  return {
    latitude: l.latitude,
    longitude: l.longitude,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025
  };
}

export function rainworkToCoords(r) {
  return { latitude: r["lat"], longitude: r["lng"], query: r["name"] };
}

export function androidRainworkToCoords(r) {
  return { query:`${r['lat']},${r['lng']}`, zoom: 10 };
}
