import { Root } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';
import { STATUS_BAR_COLOR } from './constants/Colors';
import { ActiveRainworksProvider } from './contexts/ActiveRainworksContext';
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
          <LocationProvider>
            <ActiveRainworksProvider>
              <ReportsProvider>
                <SubmissionsProvider>
                  <NotificationHandler/>
                  <WelcomeScreen>
                    <MainNavigator/>
                  </WelcomeScreen>
                </SubmissionsProvider>
              </ReportsProvider>
            </ActiveRainworksProvider>
          </LocationProvider>
        </SubmissionProvider>
      </NavigatorProvider>
    </Preloader>
  </Root>
);