import React from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerMenuButton from '../DrawerMenuButton';
import AboutScreen from './AboutScreen';

export const ABOUT_SCREEN = 'ABOUT_SCREEN';

export default StackNavigator({
  [ABOUT_SCREEN]: {
    screen: AboutScreen,
    navigationOptions: {
      title: 'About',
      headerLeft: <DrawerMenuButton/>
    }
  },
}, {
  initialRoute: ABOUT_SCREEN,
});
