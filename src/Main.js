import { Root } from "native-base";
import React from "react";
import { StatusBar } from "react-native";
import { STATUS_BAR_COLOR } from "./constants/Colors";
import { RainworksProvider } from "./contexts/RainworksContext";
import { LocationProvider } from "./contexts/LocationContext";
import { ReportsProvider } from "./contexts/ReportsContext";
import { SubmissionsProvider } from "./contexts/SubmissionsContext";
import NotificationHandler from "./NotificationHandler";
import Preloader from "./Preloader";
import { SubmissionProvider } from "./SubmitStack/SubmissionContext";
import WelcomeScreen from "./WelcomeScreen";
import { createAppContainer } from "react-navigation";
import MainNavigator from "./MainNavigator";

const AppContainer = createAppContainer(MainNavigator);

export default () => (
  <Root>
    <StatusBar
      backgroundColor={STATUS_BAR_COLOR}
      barStyle={"light-content"}
      translucent={true}
    />
    <Preloader>
      <SubmissionProvider>
        <RainworksProvider>
          <ReportsProvider>
            <SubmissionsProvider>
              <NotificationHandler />
              <WelcomeScreen>
                <LocationProvider>
                  <AppContainer />
                </LocationProvider>
              </WelcomeScreen>
            </SubmissionsProvider>
          </ReportsProvider>
        </RainworksProvider>
      </SubmissionProvider>
    </Preloader>
  </Root>
);
