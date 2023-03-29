import React from "react";
import { StatusBar, Platform, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerMenuButton from "../../components/DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../../../utils/navigationConfigs";
import GalleryDetailsScreen from "./GalleryDetailsScreen";
import GalleryScreen from "./GalleryScreen";
import { GALLERY_SCREEN, GALLERY_DETAILS_SCREEN } from "./ScreenNames";

const Stack = createStackNavigator();

const GalleryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...defaultStackNavigatorConfig,
        title: "Gallery",
      })}
    >
      <Stack.Screen
        name={GALLERY_SCREEN}
        component={GalleryScreen}
        options={({ navigation }) => ({
          headerLeft: () => <DrawerMenuButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={GALLERY_DETAILS_SCREEN}
        component={GalleryDetailsScreen}
        options={({ route }) => {
          const { rainwork } = route.params;

          return {
            title: `${rainwork["name"]}`,
          };
        }}
      />
    </Stack.Navigator>
  );
};

// createStackNavigator(
//   {
//     [GALLERY_SCREEN]: {
//       screen: GalleryScreen,
//       navigationOptions: {
//         title: "Gallery",
//         headerLeft: <DrawerMenuButton />,
//         headerTitleStyle: {
//           textAlign: "center",
//           flexGrow: 0.7,
//           paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
//         },
//         unmountOnBlur: true,
//       },
//     },
//     [GALLERY_DETAILS_SCREEN]: {
//       screen: GalleryDetailsScreen,
//       navigationOptions: ({ navigation }) => {
//         const rainwork = navigation.state.params.rainwork;
//         return {
//           title: `${rainwork["name"]}`,
//           headerLeftContainerStyle: {
//             paddingTop:
//               Platform.OS === "android" ? StatusBar.currentHeight : 10,
//           },
//           headerTitleStyle: {
//             textAlign: "center",
//             flexGrow: 0.7,
//             paddingTop:
//               Platform.OS === "android" ? StatusBar.currentHeight : 10,
//           },
//           unmountOnBlur: true,
//         };
//       },
//     },
//   },
//   {
//     ...defaultStackNavigatorConfig,
//     initialRoute: GALLERY_SCREEN,
//   }
// );

export default GalleryStack;
