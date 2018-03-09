import { StyleSheet } from 'react-native';

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: '#14a9e6',
  },
});

export const defaultStackNavigatorConfig = {
  navigationOptions: {
    headerStyle: headerStyles.header,
    headerTintColor: '#FFFFFF',
  }
};