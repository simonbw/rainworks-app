import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export const DIVIDER_HEIGHT = StyleSheet.hairlineWidth * 2;

const Divider = ({ style }) => (
  <View style={[styles.divider, style]}/>
);

Divider.propTypes = {};

const styles = StyleSheet.create({
  divider: {
    height: DIVIDER_HEIGHT,
    backgroundColor: '#BBB',
  }
});

export default Divider;