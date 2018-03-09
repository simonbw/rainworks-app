import { Button, Icon } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';

const DrawerMenuButton = ({ navigation, tintColor = '#FFFFFF' }) => (
  <Button
    transparent
    style={{ height: '100%' }}
    onPress={() => navigation.navigate('DrawerOpen')}
  >
    <Icon name="menu" style={{ color: tintColor }}/>
  </Button>
);

export default withNavigation(DrawerMenuButton);