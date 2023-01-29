import React from "react";
import { StatusBar, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerMenuButton from "../../components/DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../../../utils/navigationConfigs";
import AboutScreen from "./AboutScreen";
import { ABOUT_SCREEN } from "./ScreenNames";
import { RAINWORKS_BLUE, WHITE } from "../../constants/Colors";

const Stack = createStackNavigator();

const AboutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...defaultStackNavigatorConfig,
        title: "About",
        headerLeft: () => <DrawerMenuButton navigation={navigation} />,
      })}
    >
      <Stack.Screen name={ABOUT_SCREEN} component={AboutScreen} />
    </Stack.Navigator>
  );
};
// createStackNavigator(
//   {
//     [ABOUT_SCREEN]: {
//       screen: AboutScreen,
//       navigationOptions: {
//         title: "About",
//         headerTitleStyle: {
//           textAlign: "center",
//           flexGrow: 0.7,
//           paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
//         },
//         headerLeft: <DrawerMenuButton />,
//       },
//     },
//   },
//   {
//     ...defaultStackNavigatorConfig,
//     initialRoute: ABOUT_SCREEN,
//   }
// );

export default AboutStack;
