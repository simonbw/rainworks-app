import React from "react";
import { StatusBar, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerMenuButton from "../../components/DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../../../utils/navigationConfigs";
import GuidelinesScreen from "./GuidelinesScreen";
import InfoScreen from "./InfoScreen";
import LocationSelectScreen from "./LocationSelectScreen";
import {
  LOCATION_SELECT_SCREEN,
  GUIDELINES_SCREEN,
  INFO_SCREEN,
} from "./ScreenNames";

const Stack = createStackNavigator();

const SubmitStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...defaultStackNavigatorConfig,
      headerTitleStyle: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
      },
    }}
  >
    <Stack.Screen
      name={GUIDELINES_SCREEN}
      component={GuidelinesScreen}
      options={({ navigation }) => ({
        headerTitle: "Guidelines",
        headerLeft: () => <DrawerMenuButton navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name={LOCATION_SELECT_SCREEN}
      component={LocationSelectScreen}
      options={{
        headerTitle: "Select Location",
        headerLeftContainerStyle: {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
        },
      }}
    />
    <Stack.Screen
      name={INFO_SCREEN}
      component={InfoScreen}
      options={{
        headerTitle: "Info",
        headerLeftContainerStyle: {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
        },
      }}
    />
  </Stack.Navigator>
);

export default SubmitStack;

// createStackNavigator(
//   {
//     [GUIDELINES_SCREEN]: {
//       screen: GuidelinesScreen,
//       navigationOptions: {
//         headerLeft: <DrawerMenuButton />,
//         headerTitleStyle: {
//           paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
//         },
//         unmountOnBlur: true,
//       },
//     },
//     [LOCATION_SELECT_SCREEN]: {
//       screen: LocationSelectScreen,
//       navigationOptions: {
//         headerLeftContainerStyle: {
//           paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
//         },
//         headerTitleStyle: {
//           paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
//         },
//         unmountOnBlur: true,
//       },
//     },
//     [INFO_SCREEN]: {
//       screen: InfoScreen,
//       navigationOptions: {
//         headerLeftContainerStyle: {
//           paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
//         },
//         headerTitleStyle: {
//           paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
//         },
//         unmountOnBlur: true,
//       },
//     },
//   },
//   {
//     ...defaultStackNavigatorConfig,
//     initialRoute: GUIDELINES_SCREEN,
//   }
// );
