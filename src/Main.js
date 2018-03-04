import { Root } from 'native-base';
import React from 'react';
import { ActiveRainworksProvider } from './contexts/ActiveRainworksContext';
import { LocationProvider } from './contexts/LocationContext';
import MainNavigator from './MainNavigator';
import { ReportsProvider } from './contexts/ReportsContext';
import { SubmissionProvider } from './SubmitStack/SubmissionContext';

export default () => (
  <Root>
    <SubmissionProvider>
      <LocationProvider>
        <ActiveRainworksProvider>
          <ReportsProvider>
            <MainNavigator/>
          </ReportsProvider>
        </ActiveRainworksProvider>
      </LocationProvider>
    </SubmissionProvider>
  </Root>
);