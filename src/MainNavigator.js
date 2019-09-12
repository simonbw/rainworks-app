import { Icon } from "native-base";
import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import AboutStack from "./AboutStack";
import GalleryStack from "./GalleryStack";
import MapStack from "./MapStack";
import SubmissionsScreen from "./SubmissionsScreen";
import SubmitStack from "./SubmitStack";
import {
  MAP_STACK,
  SUBMIT_STACK,
  SUBMISSIONS_SCREEN,
  ABOUT_SCREEN,
  GALLERY_STACK
} from "./constants/ScreenNames";
import { createAppContainer } from "react-navigation";

const MainNavigator = createDrawerNavigator(
  {
    [MAP_STACK]: {
      screen: MapStack,
      navigationOptions: {
        drawerLabel: "Map",
        drawerIcon: () => <Icon name="map" />
      }
    },
    [GALLERY_STACK]: {
      screen: GalleryStack,
      navigationOptions: {
        drawerLabel: "Gallery",
        drawerIcon: () => <Icon name="images" />
      }
    },
    [SUBMIT_STACK]: {
      screen: SubmitStack,
      navigationOptions: {
        drawerLabel: "Submit",
        drawerIcon: () => <Icon name="create" />
      }
    },
    [SUBMISSIONS_SCREEN]: {
      screen: SubmissionsScreen,
      navigationOptions: {
        drawerLabel: "Submissions",
        drawerIcon: () => <Icon name="list" />
      }
    },
    [ABOUT_SCREEN]: {
      screen: AboutStack,
      navigationOptions: {
        drawerLabel: "About Rainworks",
        drawerIcon: () => <Icon name="help" />
      }
    }
  },
  {
    drawerType: "front",
    initialRouteName: MAP_STACK
  }
);

export default MainNavigator;
