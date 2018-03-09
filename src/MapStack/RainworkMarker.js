import { Asset, MapView } from 'expo';
import moment from 'moment/moment';
import { Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { ActiveRainworksConsumer } from '../contexts/ActiveRainworksContext';
import { COMMON_DATE_FORMAT } from '../util';
import { MAP_DETAILS_SCREEN } from './index';

const RainworkMarker = ({ rainwork, navigation }) => (
  <ActiveRainworksConsumer>
    {({ refreshRainwork }) => (
      <MapView.Marker
        flat
        coordinate={{
          latitude: rainwork['lat'],
          longitude: rainwork['lng'],
        }}
        image={require('../../assets/pin.png')}
        centerOffset={{
          x: 0,
          y: -Asset.fromModule(require('../../assets/pin.png')).height / 4,
        }}
      >
        <MapView.Callout
          onPress={() => {
            refreshRainwork(rainwork['id']);
            navigation.navigate(MAP_DETAILS_SCREEN, { rainwork });
          }}
        >
          <View style={styles.tooltip}>
            <Text style={styles.title}>{rainwork['name']}</Text>
            <Text style={styles.subtitle}>
              Created
              {rainwork['creator_name'] && (
                <Fragment> by <Text style={styles.creator}>{rainwork['creator_name']}</Text></Fragment>
              )}
              {' '}
              on <Text style={styles.createdDate}>{moment(rainwork['installation_date']).format(COMMON_DATE_FORMAT)}</Text>
            </Text>
            <Text style={styles.tapToView}>tap to view</Text>
          </View>
        </MapView.Callout>
      </MapView.Marker>
    )}
  </ActiveRainworksConsumer>
);

RainworkMarker.propTypes = {
  rainwork: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  tooltip: {
    maxWidth: 300,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  creator: {
  },
  subtitle: {
    // paddingVertical: 6,
  },
  tapToView: {
    fontStyle: 'italic',
    color: '#BBB'
  },
});

export default withNavigation(RainworkMarker);