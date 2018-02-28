import React from 'react';
import MainNavigator from './MainNavigator';
import { RainworkInfoProvider } from './SubmitStack/RainworkInfoContext';

export default () => (
  <RainworkInfoProvider>
    <MainNavigator/>
  </RainworkInfoProvider>
);