import moment from 'moment/moment';
import { Button, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import openMap from 'react-native-open-maps';
import Divider from '../Divider';
import { COMMON_DATE_FORMAT } from '../util';
import DetailsImage from './DetailsImage';
import ReportButtons from './ReportButtons';
import ReportsText from './ReportsText';

const DetailsContent = ({ rainwork, includeReports = false }) => (
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
      
      <Divider/>
      
      {rainwork['description'] ? (
        <Fragment>
          <Text style={styles.description}>{rainwork['description']}</Text>
          <Divider/>
        </Fragment>
      ) : null}
      
      {includeReports && (
        <View style={styles.foundItSection}>
          <ReportsText rainwork={rainwork}/>
          <ReportButtons rainwork={rainwork}/>
        </View>
      )}
      
      <Divider/>
      
      <View style={styles.openInMapsContainer}>
        <Button
          transparent
          onPress={() => openMap({ latitude: rainwork['lat'], longitude: rainwork['lng'] })}
        >
          <Text>Open in Maps</Text>
        </Button>
      </View>
    </View>
  </ScrollView>
);

DetailsContent.propTypes = {
  rainwork: PropTypes.object.isRequired,
  includeReports: PropTypes.bool,
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    paddingVertical: 12,
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
  openInMapsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 12,
  }
});

export default DetailsContent;