import { Button, Icon } from 'native-base';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { SUBMIT_STACK } from '../MainNavigator';
import DrawerMenuButton from '../DrawerMenuButton';
import SubmissionDetailsScreen from './SubmissionDetailsScreen';
import SubmissionsList from './SubmissionsList';

const NewSubmissionButton = ({ navigation }) => (
  <Button transparent onPress={() => navigation.navigate(SUBMIT_STACK)}>
    <Icon name="create"/>
  </Button>
);

export const SUBMISSIONS_LIST_SCREEN = 'SUBMISSIONS_LIST_SCREEN';
export const SUBMISSION_DETAILS_SCREEN = 'SUBMISSIONS_DETAILS_SCREEN';

export default StackNavigator({
  [SUBMISSIONS_LIST_SCREEN]: {
    screen: SubmissionsList,
    navigationOptions: ({ navigation }) => ({
      title: 'Submissions',
      headerLeft: <DrawerMenuButton/>,
      headerRight: <NewSubmissionButton navigation={navigation}/>,
    })
  },
  [SUBMISSION_DETAILS_SCREEN]: {
    screen: SubmissionDetailsScreen,
    navigationOptions: ({ navigation }) => {
      const rainwork = navigation.state.params.rainwork;
      return ({
        title: `${rainwork['name']}`
      });
    }
  },
}, {
  initialScreen: SUBMISSIONS_LIST_SCREEN,
});