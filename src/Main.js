import { Root } from 'native-base';
import React from 'react';
import { LocationProvider } from './LocationContext';
import MainNavigator from './MainNavigator';
import { SubmissionProvider } from './SubmitStack/SubmissionContext';

export default () => (
  <Root>
    <SubmissionProvider>
      <LocationProvider>
        <MainNavigator/>
      </LocationProvider>
    </SubmissionProvider>
  </Root>
);