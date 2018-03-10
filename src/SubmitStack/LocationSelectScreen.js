import { Asset } from 'expo';
import { Button, Text, View } from 'native-base';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import ToggleableMapView from '../ToggleableMapView';
import { INFO_SCREEN } from './index';
import { SubmissionConsumer } from './SubmissionContext';

const UnconnectedLocationSelectScreen = ({ navigation, setLocation, lat, lng }) => (
  <View style={{ flex: 1 }}>
    <ToggleableMapView
      onRegionChangeComplete={(region) => setLocation(region.latitude, region.longitude)}
    />
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, {
        justifyContent: 'center',
        alignItems: 'center'
      }]}
    >
      <Image
        style={{
          height: Asset.fromModule(require('../../assets/pin_unfound.png')).height / 2,
          width: Asset.fromModule(require('../../assets/pin_unfound.png')).width / 2,
          top: -Asset.fromModule(require('../../assets/pin_unfound.png')).height / 4,
        }}
        source={Asset.fromModule(require('../../assets/pin_unfound.png'))}
      />
    </View>
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