import { MapView } from 'expo';
import { Button, Text, View } from 'native-base';
import React from 'react';
import { withNavigation } from 'react-navigation';
import ToggleableMapView from '../ToggleableMapView';
import { INFO_SCREEN } from './index';
import { SubmissionConsumer } from './SubmissionContext';

const UnconnectedLocationSelectScreen = ({ navigation, setLocation, lat, lng }) => (
  <View style={{ flex: 1 }}>
    <ToggleableMapView onRegionChange={(region) => setLocation(region.latitude, region.longitude)}>
      <MapView.Marker
        coordinate={{
          latitude: lat,
          longitude: lng,
        }}
      />
    </ToggleableMapView>
    <Button
      style={{ position: 'absolute', bottom: 12, right: 12 }}
      onPress={() => navigation.navigate(INFO_SCREEN)}
    >
      <Text>Next</Text>
    </Button>
  </View>
);

const LocationSelectScreen = withNavigation(({ navigation }) => (
  <SubmissionConsumer>
    {({ setLocation, lat, lng }) => (
      <UnconnectedLocationSelectScreen
        navigation={navigation}
        setLocation={setLocation}
        lat={lat}
        lng={lng}
      />
    )}
  </SubmissionConsumer>
));

LocationSelectScreen.navigationOptions = {
  title: 'Select Location'
};

export default LocationSelectScreen;