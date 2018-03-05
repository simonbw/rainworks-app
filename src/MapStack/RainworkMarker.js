import { MapView } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { ActiveRainworksConsumer } from '../contexts/ActiveRainworksContext';
import { ReportsConsumer } from '../contexts/ReportsContext';
import { MAP_DETAILS_SCREEN } from './index';

const RainworkMarker = ({ rainwork, navigation }) => (
  <ActiveRainworksConsumer>
    {({ refreshRainwork }) => (
      <ReportsConsumer>
        {({ hasReport }) => (
          <MapView.Marker
            coordinate={{
              latitude: rainwork['lat'],
              longitude: rainwork['lng'],
            }}
            onPress={() => {
              refreshRainwork(rainwork['id']);
              navigation.navigate(MAP_DETAILS_SCREEN, { rainwork });
            }}
            pinColor={hasReport(rainwork['id']) ? '#0FF' : undefined}
          />
        )}
      </ReportsConsumer>
    )}
  </ActiveRainworksConsumer>
);

RainworkMarker.propTypes = {
  rainwork: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withNavigation(RainworkMarker);