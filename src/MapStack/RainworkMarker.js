import { MapView } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { ReportsConsumer } from '../contexts/ReportsContext';
import { MAP_DETAILS_SCREEN } from './index';

const RainworkMarker = ({ rainwork, navigation }) => (
  <ReportsConsumer>
    {({ getReport }) => (
      <MapView.Marker
        coordinate={{
          latitude: rainwork['lat'],
          longitude: rainwork['lng'],
        }}
        onPress={() => navigation.navigate(MAP_DETAILS_SCREEN, { rainwork })}
        pinColor={getReport(rainwork['id'], 'found_it') ? '#0FF' : undefined}
      />
    )}
  </ReportsConsumer>
);

RainworkMarker.propTypes = {
  rainwork: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withNavigation(RainworkMarker);