import { Asset } from 'expo';
import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DrawerMenuButton from '../DrawerMenuButton';
import { defaultStackNavigatorConfig } from '../HeaderStyle';
import DetailsScreen from './MapDetailsScreen';
import MapScreen from './MapScreen';

export const MAP_SCREEN = 'MAP_SCREEN';
export const MAP_DETAILS_SCREEN = 'MAP_DETAILS_SCREEN';

export default StackNavigator({
  [MAP_SCREEN]: {
    screen: MapScreen,
    navigationOptions: {
      headerTitle: <Image
        source={require('../../assets/header@2.png')}
        style={{
          height: Asset.fromModule(require('../../assets/header@2.png')).height / 2,
          width: Asset.fromModule(require('../../assets/header@2.png')).width / 2,
        }}
      />,
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
