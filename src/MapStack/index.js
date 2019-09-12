import { Asset } from "expo-asset";
import { View } from "native-base";
import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import ReportScreen from "../DetailsView/ReportScreen";
import DrawerMenuButton from "../DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../navigationConfigs";
import DetailsScreen from "./MapDetailsScreen";
import MapScreen from "./MapScreen";
import { MAP_SCREEN, MAP_DETAILS_SCREEN, REPORT_SCREEN } from "./ScreenNames";

const MapStack = createStackNavigator(
  {
    [MAP_SCREEN]: {
      screen: MapScreen,
      navigationOptions: {
        headerTitle: (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexGrow: 1
            }}
          >
            <Image
              source={Asset.fromModule(
                require("../../assets/bundled/header.png")
              )}
            />
          </View>
        ),
        headerBackTitle: "Map",
        headerLeft: <DrawerMenuButton />,
        headerRight: <View />
      }
    },
    [MAP_DETAILS_SCREEN]: {
      screen: DetailsScreen,
      navigationOptions: ({ navigation }) => {
        const rainwork = navigation.state.params.rainwork;
        return {
          title: `${rainwork["name"]}`
        };
      }
    },
    [REPORT_SCREEN]: {
      screen: ReportScreen,
      navigationOptions: {
        title: "Report Rainwork"
      }
    }
  },
  {
    ...defaultStackNavigatorConfig,
    initialRoute: MAP_SCREEN
  }
);

export default MapStack;
