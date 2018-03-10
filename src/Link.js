import { Text } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Linking, StyleSheet } from 'react-native';

const Link = ({ url, children }) => (
  <Text
    selectable
    style={styles.link}
    onPress={() => Linking.openURL(url)}
  >
    {children}
  </Text>
);

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  link: {
    color: '#4F8EF7',
    // fontWeight: 'bold',
  }
});

export default Link;