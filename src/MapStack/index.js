import { Asset } from "expo-asset";
import { View } from "native-base";
import React from "react";
import { Image, StatusBar, Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import ReportScreen from "../DetailsView/ReportScreen";
import DrawerMenuButton from "../DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../navigationConfigs";
import DetailsScreen from "./MapDetailsScreen";
import MapScreen from "./MapScreen";
import FindMapScreen from "./FindMapScreen";
import { MAP_SCREEN, MAP_DETAILS_SCREEN, REPORT_SCREEN, FIND_MAP_SCREEN } from "./ScreenNames";

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
              flexGrow: 1,
              paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight :  10
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
        headerRight: <View />,
        unmountOnBlur: true 
      },
    },
    [FIND_MAP_SCREEN]: {
      screen: FindMapScreen,
      navigationOptions: {
        headerTitle: (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexGrow: 1,
              paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight :  10
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
        headerRight: <View />,
        unmountOnBlur: true 
      },
    },
    [MAP_DETAILS_SCREEN]: {
      screen: DetailsScreen,
      navigationOptions: ({ navigation }) => {
        const rainwork = navigation.state.params.rainwork;
        return {
          title: `${rainwork["name"]}`,
          headerTitleStyle: { paddingTop: 10},
          headerLeftContainerStyle: {paddingTop: 10},
          unmountOnBlur: true 
        };
      },
    },
    [REPORT_SCREEN]: {
      screen: ReportScreen,
      navigationOptions: {
        title: "Report Rainwork",
        headerTitleStyle: { paddingTop: 10},
        headerLeftContainerStyle: {paddingTop: 10},
        unmountOnBlur: true 
      },
    },
  },
  {
    ...defaultStackNavigatorConfig,
    initialRoute: MAP_SCREEN,
  }
);

export default MapStack;
