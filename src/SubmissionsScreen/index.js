import { Button, Icon } from "native-base";
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { WHITE } from "../constants/Colors";
import DrawerMenuButton from "../DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../navigationConfigs";
import { SUBMIT_STACK } from "../constants/ScreenNames";
import SubmissionDetailsScreen from "./SubmissionDetailsScreen";
import SubmissionsList from "./SubmissionsList";
import {
  SUBMISSIONS_LIST_SCREEN,
  SUBMISSION_DETAILS_SCREEN
} from "./ScreenNames";

const NewSubmissionButton = ({ navigation, tintColor = WHITE }) => (
  <Button
    transparent
    style={{ height: "100%" }}
    onPress={() => navigation.navigate(SUBMIT_STACK)}
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
        headerLeft: <DrawerMenuButton />,
        headerRight: <NewSubmissionButton navigation={navigation} />
      })
    },
    [SUBMISSION_DETAILS_SCREEN]: {
      screen: SubmissionDetailsScreen,
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
    initialScreen: SUBMISSIONS_LIST_SCREEN
  }
);

export default SubmissionsStack;
