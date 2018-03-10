import { View } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from "react-native-expo-image-cache";
import { GALLERY_DETAILS_SCREEN } from './index';

const GalleryItem = (props) => (
  <View style={styles.item}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.navigation.navigate(GALLERY_DETAILS_SCREEN, { rainwork: props.rainwork })}
    >
      <Image
        style={styles.image}
        resizeMode={'cover'}
        resizeMethod={'scale'}
        uri={props.rainwork['image_url']}
      />
    </TouchableOpacity>
  </View>
);

GalleryItem.propTypes = {
  rainwork: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  item: {
    height: Dimensions.get('window').width / 2,
    flex: 1,
  },
  image: {
    height: '100%',
    backgroundColor: '#666',
  }
});

export default GalleryItem;