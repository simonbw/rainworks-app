import { Icon } from 'native-base';
import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import MapStack from './MapStack';
import SubmitStack from './SubmitStack';

export const MAP_STACK = 'MAP_STACK';
export const SUBMIT_STACK = 'SUBMIT_STACK';

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
}, {
  initialRouteName: MAP_STACK,
});
