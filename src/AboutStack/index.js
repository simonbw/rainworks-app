import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DrawerMenuButton from "../DrawerMenuButton";
import {
  defaultStackNavigatorConfig,
  headerStyles
} from "../navigationConfigs";
import AboutScreen from "./AboutScreen";
import { ABOUT_SCREEN } from "./ScreenNames";

const AboutStack = createStackNavigator(
  {
    [ABOUT_SCREEN]: {
      screen: AboutScreen,
      navigationOptions: {
        title: "About",
        headerLeft: <DrawerMenuButton />
      }
    }
  },
  {
    ...defaultStackNavigatorConfig,
    initialRoute: ABOUT_SCREEN
  }
);

export default AboutStack;
