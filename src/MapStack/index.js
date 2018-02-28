import React from 'react';
import { StackNavigator } from 'react-navigation';
import DetailsScreen from './DetailsScreen';
import MapScreen from './MapScreen';

export const MAP_SCREEN = 'MAP_SCREEN';
export const MAP_DETAILS_SCREEN = 'MAP_DETAILS_SCREEN';

export default StackNavigator({
  [MAP_SCREEN]: { screen: MapScreen },
  [MAP_DETAILS_SCREEN]: { screen: DetailsScreen },
}, {
  initialRoute: MAP_SCREEN,
});
