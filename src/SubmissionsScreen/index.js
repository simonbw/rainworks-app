import { Button, Icon } from "native-base";
import React from "react";
import {  StatusBar, Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { WHITE } from "../constants/Colors";
import DrawerMenuButton from "../DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../navigationConfigs";
import SubmissionDetailsScreen from "./SubmissionDetailsScreen";
import SubmissionsList from "./SubmissionsList";
import EditInfoScreen from './EditInfoScreen'
import {
  SUBMISSIONS_LIST_SCREEN,
  SUBMISSION_DETAILS_SCREEN,
  EDIT_INFO_SCREEN
} from "./ScreenNames";
import { StackActions } from "react-navigation";
import {LOCATION_SELECT_SCREEN} from '../SubmitStack/ScreenNames'

const NewSubmissionButton = ({ navigation, tintColor = WHITE }) => (
  <Button
    transparent
    style={{ 
      height: "100%",
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight :  0
     }}
    onPress={() => {
      navigation.navigate(LOCATION_SELECT_SCREEN);
    }}
  >
    <Icon name="create" style={{ color: tintColor }} />
  </Button>
);

const SubmissionsStack = createStackNavigator(
  {
    [SUBMISSIONS_LIST_SCREEN]: {
      screen: SubmissionsList,
      navigationOptions: ({ navigation }) => ({
        title: "Submissions",
        headerTitleStyle: { 
          textAlign: "center",
          flexGrow: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10 
        },
        headerLeft: <DrawerMenuButton />,
        headerRight: <NewSubmissionButton navigation={navigation} />,
        unmountOnBlur: true 
      }),
    },
    [SUBMISSION_DETAILS_SCREEN]: {
      screen: SubmissionDetailsScreen,
      navigationOptions: ({ navigation }) => {
        const rainwork = navigation.state.params.rainwork;
        return {
          title: `${rainwork["name"]}`,
          headerTitleStyle: { paddingTop: 10 },
          headerLeftContainerStyle: { paddingTop: 10 },
          unmountOnBlur: true 
        };
      },
    },
    [EDIT_INFO_SCREEN]: { 
      screen: EditInfoScreen,
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
    initialScreen: SUBMISSIONS_LIST_SCREEN,
  }
);

export default SubmissionsStack;
