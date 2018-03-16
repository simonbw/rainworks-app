import { StyleSheet } from 'react-native';
import { RAINWORKS_BLUE, WHITE } from './constants/Colors';

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: RAINWORKS_BLUE,
    margin: 0,
    padding: 0,
  },
  headerTitle: {
    // fontFamily: 'Rainworks',
    // fontWeight: 'normal',
  }
});

export const defaultStackNavigatorConfig = {
  navigationOptions: {
    headerStyle: headerStyles.header,
    headerTitleStyle: headerStyles.headerTitle,
    headerTintColor: WHITE,
  }
};