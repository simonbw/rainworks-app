import { View } from "native-base";
import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import { LIGHT_GRAY } from "../constants/Colors";

export const DIVIDER_HEIGHT = StyleSheet.hairlineWidth * 2;

const styles = StyleSheet.create({
  divider: {
    height: DIVIDER_HEIGHT,
    backgroundColor: LIGHT_GRAY
  }
});

interface Props {
  style?: StyleProp<ViewStyle>;
}

/**
 * A horizontal line used for dividing sections.
 */
export default function Divider({ style }: Props) {
  return <View style={[styles.divider, style]} />;
}
