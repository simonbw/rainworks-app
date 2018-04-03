import { Icon, View } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Image as CachedImage } from "react-native-expo-image-cache";
import { DARK_GRAY, GRAY } from '../constants/Colors';
import { GALLERY_DETAILS_SCREEN } from './index';

const GalleryItem = (props) => (
  <View style={styles.item}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.navigation.navigate(GALLERY_DETAILS_SCREEN, { rainwork: props.rainwork })}
    >
      {props.rainwork['image_url'] ? (
        Platform.OS === 'ios' ? (
          <CachedImage
            style={styles.image}
            resizeMode={'cover'}
            resizeMethod={'scale'}
            uri={props.rainwork['image_url']}
          />
        ) : ( // TODO: Figure out how to get the cached images to work right on android
          <Image
            style={styles.image}
            resizeMode={'cover'}
            resizeMethod={'scale'}
            source={{ uri: props.rainwork['image_url'] }}
          />
        )
      ) : (
        <View style={styles.placeholder}>
          <Icon name="image" style={{ color: GRAY, fontSize: 96 }}/>
        </View>
      )}
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
    backgroundColor: DARK_GRAY,
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: DARK_GRAY,
    height: '100%',
    justifyContent: 'center',
  }
});

export default GalleryItem;