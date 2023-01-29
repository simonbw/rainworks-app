import { Button, Icon } from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, Platform, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { TRANSPARENT, WHITE } from "../../constants/Colors";
import DrawerMenuButton from "../../components/DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../../../utils/navigationConfigs";
import SubmissionDetailsScreen from "./SubmissionDetailsScreen";
import SubmissionsList from "./SubmissionsList";
import EditInfoScreen from "./EditInfoScreen";
import {
  SUBMISSIONS_LIST_SCREEN,
  SUBMISSION_DETAILS_SCREEN,
  EDIT_INFO_SCREEN,
} from "./ScreenNames";
import { LOCATION_SELECT_SCREEN } from "../Submit/ScreenNames";
import { SUBMIT_STACK } from "../../constants/ScreenNames";

const NewSubmissionButton = ({ navigation, tintColor = WHITE }) => (
  <Button
    variant="outline"
    style={{
      height: "100%",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      borderColor: TRANSPARENT,
    }}
    onPress={() => {
      navigation.navigate(SUBMIT_STACK, { screen: LOCATION_SELECT_SCREEN });
    }}
  >
    <Icon as={Ionicons} name="create" size={6} style={{ color: tintColor }} />
  </Button>
);

const Stack = createStackNavigator();

const SubmissionsStack = () => (
  <Stack.Navigator screenOptions={{ ...defaultStackNavigatorConfig }}>
    <Stack.Screen
      name={SUBMISSIONS_LIST_SCREEN}
      component={SubmissionsList}
      options={({ navigation }) => ({
        title: "Submissions",
        headerTitleStyle: {
          textAlign: "center",
          // flexGrow: 1,
          // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
        },
        headerLeft: () => <DrawerMenuButton navigation={navigation} />,
        headerRight: () => <NewSubmissionButton navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name={SUBMISSION_DETAILS_SCREEN}
      component={SubmissionDetailsScreen}
      options={({ route }) => {
        const rainwork = route.params.rainwork;
        return {
          title: `${rainwork["name"]}`,
          headerTitleStyle: { paddingTop: 10 },
          headerLeftContainerStyle: { paddingTop: 10 },
        };
      }}
    />
    <Stack.Screen
      name={EDIT_INFO_SCREEN}
      component={EditInfoScreen}
      options={{
        headerLeftContainerStyle: {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
        },
        headerTitleStyle: {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
        },
      }}
    />
  </Stack.Navigator>
);

// createStackNavigator(
//   {
//     [SUBMISSIONS_LIST_SCREEN]: {
//       screen: SubmissionsList,
//       navigationOptions: ({ navigation }) => ({
//         title: "Submissions",
//         headerTitleStyle: {
//           textAlign: "center",
//           flexGrow: 1,
//           paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
//         },
//         headerLeft: <DrawerMenuButton />,
//         headerRight: <NewSubmissionButton navigation={navigation} />,
//         unmountOnBlur: true,
//       }),
//     },
//     [SUBMISSION_DETAILS_SCREEN]: {
//       screen: SubmissionDetailsScreen,
//       navigationOptions: ({ navigation }) => {
//         const rainwork = navigation.state.params.rainwork;
//         return {
//           title: `${rainwork["name"]}`,
//           headerTitleStyle: { paddingTop: 10 },
//           headerLeftContainerStyle: { paddingTop: 10 },
//           unmountOnBlur: true,
//         };
//       },
//     },
//     [EDIT_INFO_SCREEN]: {
//       screen: EditInfoScreen,
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
//     initialScreen: SUBMISSIONS_LIST_SCREEN,
//   }
// );

export default SubmissionsStack;
