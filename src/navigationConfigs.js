import { StyleSheet } from "react-native";
import { RAINWORKS_BLUE, WHITE } from "./constants/Colors";

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: RAINWORKS_BLUE,
    margin: 0
  },
  headerTitle: {
    // fontFamily: 'Rainworks',
    // fontWeight: 'normal',
  }
});

export const defaultStackNavigatorConfig = {
  defaultNavigationOptions: {
    headerStyle: headerStyles.header,
    headerTitleStyle: headerStyles.headerTitle,
    headerTintColor: WHITE
  }
};
