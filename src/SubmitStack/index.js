import React from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerMenuButton from '../MapStack/DrawerMenuButton';
import GuidelinesScreen from './GuidelinesScreen';
import InfoScreen from './InfoScreen';
import LocationSelectScreen from './LocationSelectScreen';
import { RainworkInfoProvider } from './RainworkInfoContext';
import SuccessScreen from './SuccessScreen';

export const GUIDELINES_SCREEN = 'GUIDELINES_SCREEN';
export const LOCATION_SELECT_SCREEN = 'LOCATION_SELECT_SCREEN';
export const INFO_SCREEN = 'INFO_SCREEN';
export const SUCCESS_SCREEN = 'SUCCESS_SCREEN';

const Navigator = StackNavigator({
  [GUIDELINES_SCREEN]: { screen: GuidelinesScreen },
  [LOCATION_SELECT_SCREEN]: { screen: LocationSelectScreen },
  [INFO_SCREEN]: { screen: InfoScreen },
  [SUCCESS_SCREEN]: { screen: SuccessScreen },
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
});

export default () => (
  <RainworkInfoProvider>
    <Navigator/>
  </RainworkInfoProvider>
);
