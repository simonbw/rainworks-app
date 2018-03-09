import React from 'react';
import { StackNavigator, withNavigation } from 'react-navigation';
import DrawerMenuButton from '../DrawerMenuButton';
import { defaultStackNavigatorConfig } from '../HeaderStyle';
import GuidelinesScreen from './GuidelinesScreen';
import InfoScreen from './InfoScreen';
import LocationSelectScreen from './LocationSelectScreen';

export const GUIDELINES_SCREEN = 'GUIDELINES_SCREEN';
export const LOCATION_SELECT_SCREEN = 'LOCATION_SELECT_SCREEN';
export const INFO_SCREEN = 'INFO_SCREEN';

export default withNavigation(StackNavigator({
  [GUIDELINES_SCREEN]: {
    screen: GuidelinesScreen,
    navigationOptions: {
      headerLeft: <DrawerMenuButton/>
    }
  },
  [LOCATION_SELECT_SCREEN]: { screen: LocationSelectScreen },
  [INFO_SCREEN]: { screen: InfoScreen },
}, {
  ...defaultStackNavigatorConfig,
  initialRoute: GUIDELINES_SCREEN,
}));
