import moment from 'moment/moment';
import { Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import Divider from '../Divider';
import { FoundItSection } from './FoundItSection';

const DetailsContent = ({ rainwork, includeReports = false }) => {
  const createdDate = moment(rainwork['created_at']).format('MMM DD, YYYY');
  const imageSource = rainwork['image_url'] ?
    { uri: rainwork['image_url'], cache: 'force-cache' }
    : require('../../assets/rainwork_placeholder.png');
  return (
    <ScrollView style={{ backgroundColor: '#FFF' }}>
      <Image
        style={styles.image}
        resizeMode={'cover'}
        resizeMethod={'scale'}
        source={imageSource}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{rainwork['name']}</Text>
        <Text style={styles.subtitle}>
          Created by <Text style={styles.creator}>{rainwork['creator_name']}</Text>
          {' '}
          on <Text style={styles.createdDate}>{createdDate}</Text>
        </Text>
        
        <Divider/>
        
        {rainwork['description'] ? (
          <Fragment>
            <Text style={styles.description}>{rainwork['description']}</Text>
            <Divider/>
          </Fragment>
        ) : null}
        
        {includeReports && (
          <FoundItSection
            rainworkId={rainwork['id']}
            foundItCount={rainwork['found_it_count']}
            style={styles.foundItSection}
          />
        )}
      </View>
    </ScrollView>
  );
};

DetailsContent.propTypes = {
  rainwork: PropTypes.object.isRequired,
  includeReports: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: null,
    height: 240,
    flex: 1,
    backgroundColor: '#333',
  },
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
});

export default DetailsContent;