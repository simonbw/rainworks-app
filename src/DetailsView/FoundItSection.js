import moment from 'moment';
import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ReportsConsumer } from '../contexts/ReportsContext';
import ReportButtonBlock from './ReportButtonBlock';

export const FoundItSection = ({ rainworkId, foundItCount, ...otherProps }) => (
  <ReportsConsumer>
    {({ getReport }) => {
      const foundItReport = getReport(rainworkId, 'found_it');
      const missingReport = getReport(rainworkId, 'missing');
      return (
        <View {...otherProps}>
          <Text style={styles.foundItCount}>{getFoundItCountText(Boolean(foundItReport), foundItCount)}</Text>
          
          {missingReport && (
            <Text style={styles.missingText}>
              You reported this rainwork missing on {moment(missingReport['created_at']).format('MMM DD, YYYY')}.
            </Text>
          )}
          
          {foundItReport && (
            <Text style={styles.foundItText}>
              You found this rainwork on {moment(foundItReport['created_at']).format('MMM DD, YYYY')}.
            </Text>
          )}
          
          {!(foundItReport || missingReport) && (
            <ReportButtonBlock rainworkId={rainworkId}/>
          )}
        </View>
      );
    }}
  </ReportsConsumer>
);

function getFoundItCountText(userHasFoundIt, foundItCount) {
  if (userHasFoundIt) {
    if (foundItCount <= 1) {
      return 'You are the first person to have found this rainwork!'
    } else if (foundItCount === 2) {
      return 'You and 1 other person have found this rainwork.'
    } else {
      return 'You and {foundItCount - 1} other people have found this rainwork.'
    }
  } else {
    if (foundItCount === 0) {
      return 'No one has found this rainwork yet.'
    } else if (foundItCount === 1) {
      return '1 person has found this rainwork.'
    } else {
      return '{foundItCount} people have found this rainwork.'
    }
  }
}

const styles = StyleSheet.create({
  foundItCount: {
    marginBottom: 12,
  },
  foundItText: {
    marginBottom: 12,
    fontStyle: 'italic',
    color: '#0A0',
  },
  missingText: {
    marginBottom: 12,
    fontStyle: 'italic',
    color: '#C00',
  }
});