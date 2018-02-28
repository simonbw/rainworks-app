import { Icon } from 'native-base';
import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import MapStack from './MapStack';
import SubmissionsScreen from './SubmissionsScreen';
import SubmitStack from './SubmitStack';

export const MAP_STACK = 'MAP_STACK';
export const SUBMIT_STACK = 'SUBMIT_STACK';
export const SUBMISSIONS_SCREEN = 'SUBMISSIONS_SCREEN';

export default DrawerNavigator({
  [MAP_STACK]: {
    screen: MapStack,
    navigationOptions: {
      drawerLabel: 'Map',
      drawerIcon: () => (
        <Icon name="map"/>
      ),
    }
  },
  [SUBMIT_STACK]: {
    screen: SubmitStack,
    navigationOptions: {
      drawerLabel: 'Submit',
      drawerIcon: () => (
        <Icon name="create"/>
      ),
    }
  },
  [SUBMISSIONS_SCREEN]: {
    screen: SubmissionsScreen,
    navigationOptions: {
      drawerLabel: 'Submissions',
      drawerIcon: () => (
        <Icon name="ios-list"/>
      ),
    }
  },
}, {
  initialRouteName: MAP_STACK,
});
