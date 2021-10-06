import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DrawerMenuButton from "../DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../navigationConfigs";
import GalleryDetailsScreen from "./GalleryDetailsScreen";
import GalleryScreen from "./GalleryScreen";
import { GALLERY_SCREEN, GALLERY_DETAILS_SCREEN } from "./ScreenNames";
import { Rainwork } from "../api/rainworksApi";

const GalleryStack = createStackNavigator(
  {
    [GALLERY_SCREEN]: {
      screen: GalleryScreen,
      navigationOptions: {
        title: "Gallery",
        headerLeft: <DrawerMenuButton /> as any
      }
    },
    [GALLERY_DETAILS_SCREEN]: {
      screen: GalleryDetailsScreen,
      navigationOptions: ({ navigation }) => {
        const rainwork: Rainwork = navigation.getParam("rainwork");
        return {
          title: `${rainwork["name"]}`
        };
      }
    }
  },
  {
    ...defaultStackNavigatorConfig,
    initialRouteName: GALLERY_SCREEN
  }
);

export default GalleryStack;
