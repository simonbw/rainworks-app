import { MapView } from 'expo';
import { View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { ActivityIndicator } from 'react-native';
import RainworksProvider from '../RainworksProvider';
import ToggleableMapView from '../ToggleableMapView';
import DrawerMenuButton from './DrawerMenuButton';
import { MAP_DETAILS_SCREEN } from './index';

const MapScreen = (props) => (
  <View
    style={{
      alignItems: 'stretch',
      flex: 1,
      justifyContent: 'flex-end'
    }}
  >
    <RainworksProvider>
      {(rainworks, loading) => (
        <Fragment>
          <ToggleableMapView>
            {rainworks.map((rainwork) => (
              <MapView.Marker
                coordinate={{
                  latitude: rainwork.lat,
                  longitude: rainwork.lng,
                }} key={rainwork.id}
                onPress={() => props.navigation.navigate(MAP_DETAILS_SCREEN, { rainwork })}
              />
            ))}
          </ToggleableMapView>
          {loading && (
            <ActivityIndicator
              size={'large'}
              style={{
                position: 'absolute',
                bottom: 12,
                left: 12,
              }}
            />
          )}
        </Fragment>
      )}
    </RainworksProvider>
  </View>
);

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

MapScreen.navigationOptions = {
  title: 'Rainworks',
  headerLeft: <DrawerMenuButton/>
};

export default MapScreen;