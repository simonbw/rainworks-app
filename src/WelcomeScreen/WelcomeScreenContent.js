import { Button, Text, View } from 'native-base';
import React, { Fragment } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

const WelcomeScreenContent = ({ close }) => (
  <Fragment>
    <StatusBar
      barStyle={'dark-content'}
    />
    <View style={styles.container}>
      <Text>Welcome to the Rainworks App</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button transparent onPress={close}>
          <Text>Let's Go!</Text>
        </Button>
      </View>
    </View>
  </Fragment>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  }
});

export default WelcomeScreenContent;