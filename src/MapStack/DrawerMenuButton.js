import { Button, Icon } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';

const DrawerMenuButton = ({ navigation }) => (
  <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
    <Icon name="menu"/>
  </Button>
);

export default withNavigation(DrawerMenuButton);