import { Button, Text, View } from 'native-base';
import React from 'react';
import { MAP_STACK } from '../MainNavigator';
import DrawerMenuButton from '../MapStack/DrawerMenuButton';

const SuccessScreen = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <Text>Success!</Text>
    <Text>
      Your Rainwork has been submitted for review.
      We'll get back to you when we approve it.
    </Text>
    <Button
      onPress={() => {
        navigation.navigate(MAP_STACK);
      }}
    >
      <Text>Back To Map</Text>
    </Button>
  </View>
);

SuccessScreen.navigationOptions = {
  headerLeft: <DrawerMenuButton/>
};

export default SuccessScreen;