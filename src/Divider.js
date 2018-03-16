import { View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GRAY, LIGHT_GRAY } from './constants/Colors';

export const DIVIDER_HEIGHT = StyleSheet.hairlineWidth * 2;

const Divider = ({ style }) => (
  <View style={[styles.divider, style]}/>
);

Divider.propTypes = {};

const styles = StyleSheet.create({
  divider: {
    height: DIVIDER_HEIGHT,
    backgroundColor: LIGHT_GRAY,
  }
});

export default Divider;