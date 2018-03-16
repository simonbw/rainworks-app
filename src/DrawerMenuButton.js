import { Button, Icon } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { WHITE } from './constants/Colors';

const DrawerMenuButton = ({ navigation, tintColor = WHITE }) => (
  <Button
    transparent
    style={{ height: '100%' }}
    onPress={() => navigation.navigate('DrawerOpen')}
  >
    <Icon name="menu" style={{ color: tintColor }}/>
  </Button>
);

export default withNavigation(DrawerMenuButton);