import { Root } from "native-base";
import React from "react";
import { StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { STATUS_BAR_COLOR } from "./constants/Colors";
import { LocationProvider } from "./contexts/LocationContext";
import { RainworksProvider } from "./contexts/RainworksContext";
import { ReportsProvider } from "./contexts/ReportsContext";
import { SubmissionsProvider } from "./contexts/SubmissionsContext";
import MainNavigator from "./MainNavigator";
import NotificationHandler from "./NotificationHandler";
import Preloader from "./Preloader";
import { SubmissionProvider } from "./SubmitStack/SubmissionContext";
import WelcomeScreen from "./WelcomeScreen";

const AppContainer = createAppContainer(MainNavigator);

export default function Main() {
  return (
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
}
