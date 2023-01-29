import { StyleSheet, Dimensions } from "react-native";
import { RAINWORKS_BLUE, WHITE } from "../src/constants/Colors";

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: RAINWORKS_BLUE,
    height: Dimensions.get("screen").height / 8,
    // height: Platform.OS === "android" ? 100 : 80,
  },
  headerTitle: {
    textAlign: "center",
    // fontFamily: 'Rainworks',
    // fontWeight: 'normal',
  },
});

export const defaultStackNavigatorConfig = {
  headerStyle: headerStyles.header,
  headerTitleStyle: headerStyles.headerTitle,
  headerTintColor: WHITE,
};
