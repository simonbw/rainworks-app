import { Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Linking, StyleSheet } from "react-native";
import { ACTION_COLOR } from "../constants/Colors";

const Link = ({ url, children }) => (
  <Text selectable style={linkStyles.link} onPress={() => Linking.openURL(url)}>
    {children}
  </Text>
);

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

export const linkStyles = StyleSheet.create({
  link: {
    color: ACTION_COLOR
  }
});

export default Link;
