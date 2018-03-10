import moment from 'moment/moment';
import { Button, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import openMap from 'react-native-open-maps';
import Divider from '../Divider';
import { MAP_SCREEN } from '../MapStack';
import { COMMON_DATE_FORMAT, rainworkToCoords } from '../util';
import DetailsImage from './DetailsImage';
import ReportButtons from './ReportButtons';
import ReportsText from './ReportsText';

const DetailsContent = ({ rainwork, navigation, includeReports = false, includeFindOnMap = false, includeOpenInMaps = false }) => (
  <ScrollView style={{ backgroundColor: '#FFF' }}>
    <DetailsImage imageUrl={rainwork['image_url']}/>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{rainwork['name']}</Text>
      <Text style={styles.subtitle}>
        Created
        {rainwork['creator_name'] && (
          <Fragment> by <Text style={styles.creator}>{rainwork['creator_name']}</Text></Fragment>
        )}
        {' '}
        on <Text style={styles.createdDate}>{moment(rainwork['installation_date']).format(COMMON_DATE_FORMAT)}</Text>
      </Text>
      
      {rainwork['description'] ? (
        <Fragment>
          <Divider/>
          <Text style={styles.description}>{rainwork['description']}</Text>
        </Fragment>
      ) : null}
      
      {includeReports && (
        <Fragment>
          <Divider/>
          <View style={styles.foundItSection}>
            <ReportsText rainwork={rainwork}/>
            <ReportButtons rainwork={rainwork}/>
          </View>
        </Fragment>
      )}
      
      {(includeFindOnMap || includeOpenInMaps) && (
        <Fragment>
          <Divider/>
          <View style={styles.mapButtonsRow}>
            {includeFindOnMap ? (
              <Button bordered onPress={() => navigation.navigate(MAP_SCREEN, { selectedRainwork: rainwork })}>
                <Text>Find on Map</Text>
              </Button>
            ) : (
              <View/>
            )}
            {includeOpenInMaps ? (
              <Button bordered onPress={() => openMap(rainworkToCoords(rainwork))}>
                <Text>Open in Maps</Text>
              </Button>
            ) : (
              <View/>
            )}
          </View>
        </Fragment>
      )}
    </View>
  </ScrollView>
);

DetailsContent.propTypes = {
  includeFindOnMap: PropTypes.bool,
  includeOpenInMaps: PropTypes.bool,
  includeReports: PropTypes.bool,
  navigation: PropTypes.object,
  rainwork: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  subtitle: {
    paddingBottom: 12,
  },
  creator: {
    fontStyle: 'italic',
  },
  createdDate: {},
  description: {
    paddingVertical: 12,
  },
  foundItSection: {
    paddingVertical: 12,
  },
  mapButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  }
});

export default DetailsContent;