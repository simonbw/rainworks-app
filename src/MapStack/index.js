import React from 'react';
import { StackNavigator } from 'react-navigation';
import { defaultStackNavigatorConfig } from '../HeaderStyle';
import DetailsScreen from './DetailsScreen';
import DrawerMenuButton from '../DrawerMenuButton';
import MapScreen from './MapScreen';

export const MAP_SCREEN = 'MAP_SCREEN';
export const MAP_DETAILS_SCREEN = 'MAP_DETAILS_SCREEN';

export default StackNavigator({
  [MAP_SCREEN]: {
    screen: MapScreen,
    navigationOptions: {
      title: 'Rainworks',
      headerBackTitle: 'Map',
      headerLeft: <DrawerMenuButton/>
    }
  },
  [MAP_DETAILS_SCREEN]: {
    screen: DetailsScreen,
    navigationOptions: ({ navigation }) => {
      const rainwork = navigation.state.params.rainwork;
      return ({
        title: `${rainwork['name']}`
      })
    }
  },
}, {
  ...defaultStackNavigatorConfig,
  initialRoute: MAP_SCREEN,
});
