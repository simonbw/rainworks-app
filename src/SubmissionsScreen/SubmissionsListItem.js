import moment from 'moment/moment';
import { Icon, Right, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import { SUBMISSION_DETAILS_SCREEN } from './index';

export const ITEM_HEIGHT = 80;

function getStatusIcon(status) {
  switch (status) {
    case 'pending':
      return <Icon active name="help-circle" style={styles.pending}/>;
    case 'accepted':
      return <Icon active name="checkmark-circle" style={styles.accepted}/>;
    case 'rejected':
      return <Icon active name="close-circle" style={styles.rejected}/>;
    case 'expired':
      return <Icon active name="close-circle" style={styles.rejected}/>;
    default:
      throw new Error(`invalid status: ${status}`);
  }
}

const SubmissionsListItem = ({ navigation, rainwork }) => (
  <TouchableHighlight
    activeOpacity={0.9}
    onPress={() => navigation.navigate(SUBMISSION_DETAILS_SCREEN, { rainwork })}
  >
    <View style={styles.listItem}>
      <View style={styles.left}>
        {getStatusIcon(rainwork['approval_status'])}
      </View>
      <View style={styles.main}>
        <Text style={styles.name}>{rainwork['name']}</Text>
        <Text style={styles.date}>Submitted on {moment(rainwork['created_at']).format('MMM DD, YYYY, h:mm a')}</Text>
        <Text style={[styles.statusText, styles[rainwork['approval_status']]]}>{rainwork['approval_status']}</Text>
      </View>
      <Right/>
    </View>
  </TouchableHighlight>
);

SubmissionsListItem.propTypes = {
  rainwork: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    height: ITEM_HEIGHT,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  left: {
    width: 64,
    alignItems: 'center'
  },
  main: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 12,
  },
  name: {
    fontWeight: 'bold'
  },
  date: {},
  statusText: {
    fontStyle: 'italic'
    
  },
  pending: {
    color: '#FB0'
  },
  accepted: {
    color: '#0A0'
  },
  rejected: {
    color: '#C00'
  },
});

export default withNavigation(SubmissionsListItem);