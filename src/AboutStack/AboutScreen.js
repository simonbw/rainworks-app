import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Link from '../Link';

const AboutScreen = () => (
  <View style={styles.container}>
    <Text style={styles.paragraph}>
      A “rainwork” is a piece of street art that only appears when it gets wet. Their purpose is to make people look
      forward to rainy days.
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
    <Text style={styles.paragraph}>
      For help & support, email us
      at <Link url={'mailto://contact@rain.works'}>contact@rain.works</Link>.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 12
  },
  paragraph: {
    paddingBottom: 12,
  },
});

export default AboutScreen;