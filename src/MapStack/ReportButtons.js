import { Button, Text } from 'native-base';
import React from 'react';
import { ReportsConsumer } from '../contexts/ReportsContext';

export const FoundItButton = ({ rainworkId }) => (
  <ReportsConsumer>
    {({ getReport, submitReport }) => {
      const report = getReport(rainworkId, 'found_it');
      if (report) {
        return (
          <Text>Already Found</Text>
        );
      } else {
        return (
          <Button onPress={() => submitReport(rainworkId, 'found_it')}>
            <Text>Found It!</Text>
          </Button>
        );
      }
    }}
  </ReportsConsumer>
);