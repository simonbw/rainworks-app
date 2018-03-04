import { Root } from 'native-base';
import React from 'react';
import { ActiveRainworksProvider } from './contexts/ActiveRainworksContext';
import { LocationProvider } from './contexts/LocationContext';
import { ReportsProvider } from './contexts/ReportsContext';
import { SubmissionsProvider } from './contexts/SubmissionsContext';
import MainNavigator from './MainNavigator';
import { SubmissionProvider } from './SubmitStack/SubmissionContext';

export default () => (
  <Root>
    <SubmissionProvider>
      <LocationProvider>
        <ActiveRainworksProvider>
          <ReportsProvider>
            <SubmissionsProvider>
              <MainNavigator/>
            </SubmissionsProvider>
          </ReportsProvider>
        </ActiveRainworksProvider>
      </LocationProvider>
    </SubmissionProvider>
  </Root>
);