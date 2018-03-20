import { Button, Text, View } from 'native-base';
import React, { Fragment } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Link from '../Link';

const WelcomeScreenContent = ({ close }) => (
  <Fragment>
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome to the Rainworks App!
      </Text>
      <Text style={styles.paragraph}>
        A <Text style={{ fontStyle: 'italic' }}>rainwork</Text> is a piece of street art that only appears when it gets
        wet. Their purpose is to make people look forward to rainy days.
      </Text>
      <Text style={styles.paragraph}>
        Anybody can create a rainwork and add it to the map. Use this app to find rainworks near you, and submit
        rainworks
        you’ve made!
      </Text>
      <Text style={styles.paragraph}>
        This app works best with location services turned on.
      </Text>
      <Text style={styles.paragraph}>
        For more information and to learn how to make rainworks, please
        visit <Link url={'https://www.rain.works'}>www.rain.works</Link>.
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button transparent onPress={close}>
          <Text>Let's Get Started!</Text>
        </Button>
      </View>
    </View>
  </Fragment>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: 12 * 4,
  },
  header: {
    paddingBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    paddingBottom: 12,
    textAlign: 'justify',
  },
});

export default WelcomeScreenContent;