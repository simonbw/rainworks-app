import { StyleSheet } from 'react-native';

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: '#14a9e6',
  },
  headerTitle: {
    fontFamily: 'Rainworks',
    fontWeight: 'normal',
  }
});

export const defaultStackNavigatorConfig = {
  navigationOptions: {
    headerStyle: headerStyles.header,
    headerTitleStyle: headerStyles.headerTitle,
    headerTintColor: '#FFFFFF',
  }
};