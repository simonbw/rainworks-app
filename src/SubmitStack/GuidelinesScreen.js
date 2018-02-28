import { Button, Text, View } from 'native-base';
import React from 'react';
import { LOCATION_SELECT_SCREEN } from './index';

const GuidelinesScreen = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <Text>
        Don't be a dick.
      </Text>
    </View>
    <View>
      <Button
        onPress={() => navigation.navigate(LOCATION_SELECT_SCREEN)}
        style={{ position: 'absolute', bottom: 12, right: 12 }}
      >
        <Text>Got It</Text>
      </Button>
    </View>
  </View>
);

GuidelinesScreen.navigationOptions = {
  title: 'Submission Guidelines'
};

export default GuidelinesScreen;