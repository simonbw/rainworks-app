import React from "react";
import { withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import DrawerMenuButton from "../DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../navigationConfigs";
import GuidelinesScreen from "./GuidelinesScreen";
import InfoScreen from "./InfoScreen";
import LocationSelectScreen from "./LocationSelectScreen";
import {
  LOCATION_SELECT_SCREEN,
  GUIDELINES_SCREEN,
  INFO_SCREEN
} from "./ScreenNames";

export default withNavigation(
  createStackNavigator(
    {
      [GUIDELINES_SCREEN]: {
        screen: GuidelinesScreen,
        navigationOptions: {
          // eslint-disable-next-line react/display-name
          headerLeft: () => <DrawerMenuButton />
        }
      },
      [LOCATION_SELECT_SCREEN]: { screen: LocationSelectScreen },
      [INFO_SCREEN]: { screen: InfoScreen }
    },
    {
      ...defaultStackNavigatorConfig,
      initialRouteName: GUIDELINES_SCREEN
    }
  )
);
