import { Asset } from "expo-asset";
import { Button, Text, View } from "native-base";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import ToggleableMapView from "../Common/ToggleableMapView";
import { INFO_SCREEN } from "./ScreenNames";
import { SubmissionConsumer } from "./SubmissionContext";

const UnconnectedLocationSelectScreen = ({
  navigation,
  setLocation,
  lat,
  lng
}) => (
  <View style={{ flex: 1 }}>
    <ToggleableMapView
      onRegionChangeComplete={region =>
        setLocation(region.latitude, region.longitude)
      }
    />
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: "center",
          alignItems: "center"
        }
      ]}
    >
      <Image
        style={{
          top:
            -Asset.fromModule(require("../../assets/bundled/pin_unfound.png"))
              .height / 2
        }}
        source={Asset.fromModule(
          require("../../assets/bundled/pin_unfound.png")
        )}
      />
    </View>
    <Button
      style={{ position: "absolute", bottom: 12, right: 12 }}
      onPress={() => navigation.navigate(INFO_SCREEN)}
    >
      <Text>Next</Text>
    </Button>
  </View>
);

const LocationSelectScreen = withNavigation(({ navigation }) => (
  <SubmissionConsumer>
    {({ setLocation, lat, lng }) => (
      <UnconnectedLocationSelectScreen
        navigation={navigation}
        setLocation={setLocation}
        lat={lat}
        lng={lng}
      />
    )}
  </SubmissionConsumer>
));

LocationSelectScreen.navigationOptions = {
  title: "Select Location"
};

export default LocationSelectScreen;
