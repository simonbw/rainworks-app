import { Root } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';
import { STATUS_BAR_COLOR } from './constants/Colors';
import { RainworksProvider } from './contexts/RainworksContext';
import { LocationProvider } from './contexts/LocationContext';
import { NavigatorProvider } from './contexts/NavigatorContext';
import { ReportsProvider } from './contexts/ReportsContext';
import { SubmissionsProvider } from './contexts/SubmissionsContext';
import MainNavigator from './MainNavigator';
import NotificationHandler from './NotificationHandler';
import Preloader from './Preloader';
import { SubmissionProvider } from './SubmitStack/SubmissionContext';
import WelcomeScreen from './WelcomeScreen';

export default () => (
  <Root>
    <StatusBar
      backgroundColor={STATUS_BAR_COLOR}
      barStyle={'light-content'}
      translucent={true}
    />
    <Preloader>
      <NavigatorProvider>
        <SubmissionProvider>
          <RainworksProvider>
            <ReportsProvider>
              <SubmissionsProvider>
                <NotificationHandler/>
                <WelcomeScreen>
                  <LocationProvider>
                    <MainNavigator/>
                  </LocationProvider>
                </WelcomeScreen>
              </SubmissionsProvider>
            </ReportsProvider>
          </RainworksProvider>
        </SubmissionProvider>
      </NavigatorProvider>
    </Preloader>
  </Root>
);