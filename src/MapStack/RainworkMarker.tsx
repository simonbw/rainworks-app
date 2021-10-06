import moment from "moment/moment";
import { Text, View } from "native-base";
import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { NavigationScreenProp, withNavigation } from "react-navigation";
import { Rainwork } from "../api/rainworksApi";
import { ACTION_COLOR } from "../constants/Colors";
import { useRainworksContext } from "../contexts/RainworksContext";
import { useReportsContext } from "../contexts/ReportsContext";
import { COMMON_DATE_FORMAT } from "../utils/util";
import { MAP_DETAILS_SCREEN } from "./ScreenNames";

interface Props {
  rainwork: Rainwork;
  navigation: NavigationScreenProp<{}>;
  markerRef: React.Ref<Marker>;
}

function RainworkMarker({ rainwork, navigation, markerRef }: Props) {
  const { hasReport } = useReportsContext();
  const { refreshRainwork } = useRainworksContext();
  return (
    <Marker
      flat
      coordinate={{
        latitude: rainwork["lat"],
        longitude: rainwork["lng"]
      }}
      image={
        hasReport(rainwork["id"], "found_it")
          ? require("../../assets/bundled/pin_found.png")
          : require("../../assets/bundled/pin_unfound.png")
      }
      centerOffset={{
        x: 0,
        y: -require("../../assets/bundled/pin_unfound.png").height / 2
      }}
      ref={markerRef}
    >
      <Callout
        onPress={() => {
          refreshRainwork(rainwork["id"]);
          navigation.navigate(MAP_DETAILS_SCREEN, { rainwork });
        }}
      >
        <View style={styles.tooltip}>
          <Text style={styles.title}>{rainwork["name"]}</Text>
          <Text style={styles.subtitle}>
            Created
            {rainwork["creator_name"] && (
              <Fragment>
                {" "}
                by{" "}
                <Text style={styles.creator}>{rainwork["creator_name"]}</Text>
              </Fragment>
            )}{" "}
            on{" "}
            <Text style={styles.createdDate}>
              {moment(rainwork["installation_date"]).format(COMMON_DATE_FORMAT)}
            </Text>
          </Text>
          <Text style={styles.tapToView}>tap to view</Text>
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  tooltip: {
    maxWidth: 300,
    alignItems: "center"
  },
  title: {
    fontWeight: "bold"
  },
  creator: {},
  subtitle: {
    // paddingVertical: 6,
  },
  createdDate: {},
  tapToView: {
    fontStyle: "italic",
    color: ACTION_COLOR
  }
});

export default withNavigation(RainworkMarker);
