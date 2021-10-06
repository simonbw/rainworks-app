import { Text } from "native-base";
import React from "react";
import { Linking, StyleSheet } from "react-native";
import { ACTION_COLOR } from "../constants/Colors";

const styles = StyleSheet.create({
  link: {
    color: ACTION_COLOR
  }
});

interface Props {
  url: string;
  children: React.ReactNode;
}

/**
 * A simple hyperlink.
 */
const Link = ({ url, children }: Props) => (
  <Text selectable style={styles.link} onPress={() => Linking.openURL(url)}>
    {children}
  </Text>
);

export default Link;
