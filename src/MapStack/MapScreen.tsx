import { View } from "native-base";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Rainwork } from "../api/rainworksApi";
import ToggleableMapView from "../Common/ToggleableMapView";
import { useRainworksContext } from "../contexts/RainworksContext";
import RainworkMarker from "./RainworkMarker";
import { Marker } from "react-native-maps";

interface Props {
  navigation: NavigationScreenProp<{}>;
  rainworks: ReadonlyArray<Rainwork[]>;
  loading: boolean;
  refreshAll: () => void;
}

export default function MapScreen({ navigation }: Props) {
  const {
    activeRainworks: rainworks,
    loading,
    refreshAll
  } = useRainworksContext();
  const selectedRainwork = navigation.getParam("selectedRainwork", undefined);

  const markerRefs = rainworks.map(() => React.createRef<Marker>());

  useEffect(() => {
    if (!loading) {
      refreshAll();
    }
    if (selectedRainwork) {
      const { current: selectedMarker } = markerRefs[selectedRainwork["id"]];
      if (selectedMarker) {
        setTimeout(() => {
          // I'm not exactly sure why this had to be asynchronous, but it works
          console.log("showing marker callout");
          selectedMarker.showCallout();
        }, 0);
      }
    }
  });

  return (
    <View
      style={{
        alignItems: "stretch",
        flex: 1,
        justifyContent: "flex-end"
      }}
    >
      <ToggleableMapView selectedRainwork={selectedRainwork}>
        {rainworks.map((rainwork, i) => (
          <RainworkMarker
            key={rainwork["id"]}
            rainwork={rainwork}
            markerRef={markerRefs[i]}
          />
        ))}
      </ToggleableMapView>
      {loading && (
        <ActivityIndicator
          size={"large"}
          style={{
            position: "absolute",
            top: 12,
            right: 12
          }}
        />
      )}
    </View>
  );
}
