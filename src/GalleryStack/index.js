import React from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerMenuButton from '../DrawerMenuButton';
import { defaultStackNavigatorConfig, headerStyles } from '../HeaderStyle';
import GalleryDetailsScreen from './GalleryDetailsScreen';
import GalleryScreen from './GalleryScreen';

export const GALLERY_SCREEN = 'GALLERY_SCREEN';
export const GALLERY_DETAILS_SCREEN = 'GALLERY_DETAILS_SCREEN';

export default StackNavigator({
  [GALLERY_SCREEN]: {
    screen: GalleryScreen,
    navigationOptions: {
      title: 'Gallery',
      headerLeft: <DrawerMenuButton/>,
    }
  },
  [GALLERY_DETAILS_SCREEN]: {
    screen: GalleryDetailsScreen,
    navigationOptions: ({ navigation }) => {
      const rainwork = navigation.state.params.rainwork;
      return ({
        title: `${rainwork['name']}`
      });
    }
  },
}, {
  ...defaultStackNavigatorConfig,
  initialRoute: GALLERY_SCREEN,
});
