import React from 'react';
import { StackNavigator, withNavigation } from 'react-navigation';
import DrawerMenuButton from '../DrawerMenuButton';
import GuidelinesScreen from './GuidelinesScreen';
import InfoScreen from './InfoScreen';
import LocationSelectScreen from './LocationSelectScreen';

export const GUIDELINES_SCREEN = 'GUIDELINES_SCREEN';
export const LOCATION_SELECT_SCREEN = 'LOCATION_SELECT_SCREEN';
export const INFO_SCREEN = 'INFO_SCREEN';

export default withNavigation(StackNavigator({
  [GUIDELINES_SCREEN]: { screen: GuidelinesScreen },
  [LOCATION_SELECT_SCREEN]: { screen: LocationSelectScreen },
  [INFO_SCREEN]: { screen: InfoScreen },
}, {
  initialRoute: GUIDELINES_SCREEN,
  navigationOptions: ({ navigation }) => {
    const options = {};
    const currentPage = navigation.state.routeName;
    if (currentPage === GUIDELINES_SCREEN) {
      options.headerLeft = <DrawerMenuButton/>
    }
    return options;
  }
}));
