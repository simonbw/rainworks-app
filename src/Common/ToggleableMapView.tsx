import MapView, { Marker, MapViewProps } from "react-native-maps";
import { Icon, View } from "native-base";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ACTION_COLOR, WHITE } from "../constants/Colors";
import { useUserLocation } from "../contexts/LocationContext";
import { coordsToRegion, rainworkToCoords } from "../utils/mapUtils";

type MapType = "hybrid" | "standard";

interface Props extends MapViewProps {
  selectedRainwork: any; // TODO: Better rainwork type
  children: React.ReactNode;
  initialMapType?: MapType;
}

export default function ToggleableMapView({
  initialMapType = "standard",
  selectedRainwork,
  children,
  ...mapProps
}: Props) {
  const [mapType, setMapType] = useState(initialMapType);
  const selectedRegion =
    selectedRainwork && coordsToRegion(rainworkToCoords(selectedRainwork));

  const mapRef = React.createRef<MapView>();
  const userLocation = useUserLocation();
  const userRegion = userLocation
    ? coordsToRegion(userLocation.coords)
    : undefined;

  function toggleMapType() {
    setMapType(mapType === "hybrid" ? "standard" : "hybrid");
  }

  return (
    <>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        mapType={mapType}
        {...mapProps}
        initialRegion={selectedRegion || userRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {userRegion && (
          <Marker coordinate={userRegion}>
            <View style={styles.currentLocationMarker} />
          </Marker>
        )}
        {children || null}
      </MapView>
      <View style={styles.buttonSheet}>
        {userRegion && (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.4}
            onPress={() =>
              mapRef.current && mapRef.current.animateToRegion(userRegion)
            }
          >
            <Icon name="locate" style={{ color: ACTION_COLOR }} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.4}
          onPress={toggleMapType}
        >
          <Icon name="eye" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonSheet: {
    bottom: 0,
    justifyContent: "flex-end",
    left: 0,
    position: "absolute",
    padding: 6
  },
  button: {
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 100,
    height: 48,
    justifyContent: "center",
    margin: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 48
  },
  currentLocationMarker: {
    backgroundColor: ACTION_COLOR,
    borderColor: WHITE,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth * 5,
    height: 16,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 16
  }
});
