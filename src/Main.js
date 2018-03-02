import React from 'react';
import { LocationProvider } from './LocationContext';
import MainNavigator from './MainNavigator';
import { SubmissionProvider } from './SubmitStack/SubmissionContext';

export default () => (
  <SubmissionProvider>
    <LocationProvider>
      <MainNavigator/>
    </LocationProvider>
  </SubmissionProvider>
);