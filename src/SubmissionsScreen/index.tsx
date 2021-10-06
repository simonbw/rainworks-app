import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DrawerMenuButton from "../DrawerMenuButton";
import { defaultStackNavigatorConfig } from "../navigationConfigs";
import NewSubmissionButton from "./NewSubmissionButton";
import {
  SUBMISSIONS_LIST_SCREEN,
  SUBMISSION_DETAILS_SCREEN
} from "./ScreenNames";
import SubmissionDetailsScreen from "./SubmissionDetailsScreen";
import SubmissionsList from "./SubmissionsList";
import { Rainwork } from "../api/rainworksApi";

const SubmissionsStack = createStackNavigator(
  {
    [SUBMISSIONS_LIST_SCREEN]: {
      screen: SubmissionsList,
      navigationOptions: ({ navigation }) => ({
        title: "Submissions",
        // eslint-disable-next-line react/display-name
        headerLeft: () => <DrawerMenuButton />,
        headerRight: <NewSubmissionButton navigation={navigation} />
      })
    },
    [SUBMISSION_DETAILS_SCREEN]: {
      screen: SubmissionDetailsScreen,
      navigationOptions: ({ navigation }) => {
        const rainwork: Rainwork = navigation.getParam("rainwork");
        return {
          title: `${rainwork["name"]}`
        };
      }
    }
  },
  {
    ...defaultStackNavigatorConfig,
    initialRouteName: SUBMISSIONS_LIST_SCREEN
  }
);

export default SubmissionsStack;
