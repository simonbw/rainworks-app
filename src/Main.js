import { Root } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';
import { ActiveRainworksProvider } from './contexts/ActiveRainworksContext';
import { LocationProvider } from './contexts/LocationContext';
import { ReportsProvider } from './contexts/ReportsContext';
import { SubmissionsProvider } from './contexts/SubmissionsContext';
import MainNavigator from './MainNavigator';
import Preloader from './Preloader';
import { SubmissionProvider } from './SubmitStack/SubmissionContext';

export default () => (
  <Root>
    <StatusBar
      backgroundColor={'#00000000'}
      barStyle={'light-content'}
      translucent={true}
    />
    <Preloader>
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
    </Preloader>
  </Root>
);
