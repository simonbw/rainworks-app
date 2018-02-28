import { MapView } from 'expo';
import { Button, Text, View } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { INFO_SCREEN } from './index';
import { RainworkInfoConsumer } from './RainworkInfoContext';

const UnconnectedLocationSelectScreen = ({ navigation, setLocation, lat, lng }) => (
  <View style={{ flex: 1 }}>
    <MapView
      style={{ flex: 1 }}
      onRegionChange={(region) => setLocation(region.latitude, region.longitude)}
    >
      <MapView.Marker
        coordinate={{
          latitude: lat,
          longitude: lng,
        }}
      />
    </MapView>
    <Button
      style={{ position: 'absolute', bottom: 12, right: 12 }}
      onPress={() => navigation.navigate(INFO_SCREEN)}
    >
      <Text>Next</Text>
    </Button>
  </View>
);

const LocationSelectScreen = withNavigation(({ navigation }) => (
  <RainworkInfoConsumer>
    {({ setLocation, lat, lng }) => (
      <UnconnectedLocationSelectScreen
        navigation={navigation}
        setLocation={setLocation}
        lat={lat}
        lng={lng}
      />
    )}
  </RainworkInfoConsumer>
));

LocationSelectScreen.navigationOptions = {
  title: 'Select Location'
};

export default LocationSelectScreen;