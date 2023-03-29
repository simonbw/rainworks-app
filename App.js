import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { STATUS_BAR_COLOR } from "./src/constants/Colors";
// import Preloader from "./utils/Preloader";
import { SubmissionProvider } from "./src/screens/Submit/SubmissionContext";
import SubmissionsProvider from "./src/contexts/SubmissionsContext";
import { RainworksProvider } from "./src/contexts/RainworksContext";
import { ReportsProvider } from "./src/contexts/ReportsContext";
import NotificationHandler from "./utils/NotificationHandler";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { LocationProvider } from "./src/contexts/LocationContext";
import AppRoutes from "./src/navigation/routes";

export default function App() {
  return (
    // <NativeBaseProvider>
    //   <StatusBar
    //     backgroundColor={STATUS_BAR_COLOR}
    //     barStyle={"light-content"}
    //     translucent={true}
    //   />
    //   <Preloader>
    //     <SubmissionProvider>
    //       <RainworksProvider>
    //         <ReportsProvider>
    //           <SubmissionsProvider>
    //             <NavigationContainer>
    //               <NotificationHandler />
    //               <WelcomeScreen>
    //                 <LocationProvider>
    //                   <AppRoutes />
    //                 </LocationProvider>
    //               </WelcomeScreen>
    //             </NavigationContainer>
    //           </SubmissionsProvider>
    //         </ReportsProvider>
    //       </RainworksProvider>
    //     </SubmissionProvider>
    //   </Preloader>
    // </NativeBaseProvider>
    <SafeAreaProvider>
      <NativeBaseProvider>
        <SubmissionProvider>
          <RainworksProvider>
            <ReportsProvider>
              <SubmissionsProvider>
                <NavigationContainer>
                  <NotificationHandler />
                  <WelcomeScreen>
                    <LocationProvider>
                      <AppRoutes />
                      <Toast />
                    </LocationProvider>
                  </WelcomeScreen>
                </NavigationContainer>
              </SubmissionsProvider>
            </ReportsProvider>
          </RainworksProvider>
        </SubmissionProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
