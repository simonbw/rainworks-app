import { Asset, MapView } from 'expo';
import moment from 'moment/moment';
import { Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { GRAY } from '../constants/Colors';
import { ActiveRainworksConsumer } from '../contexts/ActiveRainworksContext';
import { ReportsConsumer } from '../contexts/ReportsContext';
import { COMMON_DATE_FORMAT } from '../util';
import { MAP_DETAILS_SCREEN } from './index';

const RainworkMarker = ({ rainwork, navigation, markerRef }) => (
  <ReportsConsumer>
    {({ hasReport }) => (
      <ActiveRainworksConsumer>
        {({ refreshRainwork }) => (
          <MapView.Marker
            flat
            coordinate={{
              latitude: rainwork['lat'],
              longitude: rainwork['lng'],
            }}
            image={hasReport(rainwork['id'], 'found_it') ?
              Asset.fromModule(require('../../assets/pin_found.png')) :
              Asset.fromModule(require('../../assets/pin_unfound.png'))
            }
            centerOffset={{
              x: 0,
              y: -Asset.fromModule(require('../../assets/pin_unfound.png')).height / 4,
            }}
            ref={markerRef}
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
                  on <Text style={styles.createdDate}>
                  {moment(rainwork['installation_date']).format(COMMON_DATE_FORMAT)}
                </Text>
                </Text>
                <Text style={styles.tapToView}>tap to view</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        )}
      </ActiveRainworksConsumer>
    )}
  </ReportsConsumer>
);

RainworkMarker.propTypes = {
  rainwork: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  markerRef: PropTypes.func,
};

const styles = StyleSheet.create({
  tooltip: {
    maxWidth: 300,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  creator: {},
  subtitle: {
    // paddingVertical: 6,
  },
  tapToView: {
    fontStyle: 'italic',
    color: GRAY,
  },
});

export default withNavigation(RainworkMarker);