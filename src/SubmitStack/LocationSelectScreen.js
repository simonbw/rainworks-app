import { Asset } from "expo-asset";
import { Button, Text, View } from "native-base";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import SubmitToggleMapView from "../Common/SubmitToggleMapView";
import { INFO_SCREEN } from "./ScreenNames";
import { SubmissionConsumer } from "./SubmissionContext";
import { RAINWORKS_BLUE } from "../constants/Colors";

const UnconnectedLocationSelectScreen = ({
  navigation,
  route,
  setLocation,
  lat,
  lng,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <SubmitToggleMapView
        onRegionChangeComplete={(region) =>
          setLocation(region.latitude, region.longitude)
        }
        initialMapType="hybrid"
      />
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Image
          style={{
            top:
              -Asset.fromModule(require("../../assets/bundled/pin_unfound.png"))
                .height / 2,
          }}
          source={Asset.fromModule(
            require("../../assets/bundled/pin_unfound.png")
          )}
        />
      </View>
      <Button
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          backgroundColor: RAINWORKS_BLUE,
        }}
        onPress={() => navigation.navigate(INFO_SCREEN)}
      >
        <Text>Next</Text>
      </Button>
    </View>
  );
};

const LocationSelectScreen = withNavigation(({ navigation }) => (
  <SubmissionConsumer>
    {({ setLocation, lat, lng }) => {
      return (
        <UnconnectedLocationSelectScreen
          navigation={navigation}
          setLocation={setLocation}
          lat={lat}
          lng={lng}
        />
      );
    }}
  </SubmissionConsumer>
));

LocationSelectScreen.navigationOptions = {
  title: "Select Location",
};

export default LocationSelectScreen;
