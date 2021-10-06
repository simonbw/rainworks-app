import { View } from "native-base";
import React from "react";
import { Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import headerImageUri from "../../assets/bundled/header.png";
import { Rainwork } from "../api/rainworksApi";
import ReportScreen from "../DetailsView/ReportScreen";
import DrawerMenuButton from "../DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../navigationConfigs";
import DetailsScreen from "./MapDetailsScreen";
import MapScreen from "./MapScreen";
import { MAP_DETAILS_SCREEN, MAP_SCREEN, REPORT_SCREEN } from "./ScreenNames";

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
            <Image source={headerImageUri} />
          </View>
        ) as any,
        headerBackTitle: "Map",
        headerLeft: <DrawerMenuButton /> as any,
        headerRight: <View />
      }
    },
    [MAP_DETAILS_SCREEN]: {
      screen: DetailsScreen,
      navigationOptions: ({ navigation }) => {
        const rainwork: Rainwork = navigation.getParam("rainwork");
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
    initialRouteName: MAP_SCREEN
  }
);

export default MapStack;
