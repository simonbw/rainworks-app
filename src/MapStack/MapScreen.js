import { MapView } from 'expo';
import { View } from 'native-base';
import React from 'react';
import RainworksProvider from '../RainworksProvider';
import DrawerMenuButton from './DrawerMenuButton';
import { MAP_DETAILS_SCREEN } from './index';

const MapScreen = ({ navigation }) => (
  <View
    style={{
      alignItems: 'stretch',
      flex: 1,
      justifyContent: 'flex-end'
    }}
  >
    <RainworksProvider>
      {(rainworks, loading) => (
        <MapView style={{ flex: 1 }}>
          {rainworks.map((rainwork) => (
            <MapView.Marker
              coordinate={{
                latitude: rainwork.lat,
                longitude: rainwork.lng,
              }} key={rainwork.id}
              onPress={() => navigation.navigate(MAP_DETAILS_SCREEN, { rainwork })}
            />
          ))}
        </MapView>
      )}
    </RainworksProvider>
  </View>
);

MapScreen.navigationOptions = {
  title: 'Rainworks',
  headerLeft: <DrawerMenuButton/>
};

MapScreen.propTypes = {};

export default MapScreen;