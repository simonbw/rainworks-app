import { Button, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ReportsConsumer } from '../contexts/ReportsContext';

const ReportButtonBlock = ({ rainworkId }) => (
  <ReportsConsumer>
    {({ getReport, hasReport, submitReport }) => (
      <View>
        <Button
          block
          success
          style={styles.button}
          onPress={() => submitReport(rainworkId, 'found_it')}
        >
          <Text>I Found It!</Text>
        </Button>
        <Button
          block
          danger
          bordered
          style={styles.button}
          onPress={() => submitReport(rainworkId, 'missing')}
        >
          <Text>It's Not Here</Text>
        </Button>
      </View>
    )}
  </ReportsConsumer>
);

ReportButtonBlock.propTypes = {
  rainworkId: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 12,
  }
});

export default ReportButtonBlock;