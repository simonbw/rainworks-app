import React from "react";
import {  StatusBar, Platform } from "react-native";
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
          headerLeft: <DrawerMenuButton />,
          headerTitleStyle: {
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10
          },
          unmountOnBlur: true 
        }
      },
      [LOCATION_SELECT_SCREEN]: { 
        screen: LocationSelectScreen,
        navigationOptions: {
          headerLeftContainerStyle: {
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10
          },
          headerTitleStyle: { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10 },
          unmountOnBlur: true 
        } 
      },
      [INFO_SCREEN]: { 
        screen: InfoScreen,
        navigationOptions: {
          headerLeftContainerStyle: {
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10
          },
          headerTitleStyle: { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10 },
           unmountOnBlur: true 
        } 
      }
    },
    {
      ...defaultStackNavigatorConfig,
      initialRoute: GUIDELINES_SCREEN
    }
  )
);
