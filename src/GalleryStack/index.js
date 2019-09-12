import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DrawerMenuButton from "../DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../navigationConfigs";
import GalleryDetailsScreen from "./GalleryDetailsScreen";
import GalleryScreen from "./GalleryScreen";
import { GALLERY_SCREEN, GALLERY_DETAILS_SCREEN } from "./ScreenNames";

const GalleryStack = createStackNavigator(
  {
    [GALLERY_SCREEN]: {
      screen: GalleryScreen,
      navigationOptions: {
        title: "Gallery",
        headerLeft: <DrawerMenuButton />
      }
    },
    [GALLERY_DETAILS_SCREEN]: {
      screen: GalleryDetailsScreen,
      navigationOptions: ({ navigation }) => {
        const rainwork = navigation.state.params.rainwork;
        return {
          title: `${rainwork["name"]}`
        };
      }
    }
  },
  {
    ...defaultStackNavigatorConfig,
    initialRoute: GALLERY_SCREEN
  }
);

export default GalleryStack;
