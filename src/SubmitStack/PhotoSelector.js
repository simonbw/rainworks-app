import { ImagePicker } from 'expo';
import { ActionSheet, Icon, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, ImageEditor, StyleSheet, TouchableOpacity } from 'react-native';
import { showError } from '../util';

const MAXIMUM_DIMENSION = 1024;

export default class PhotoSelector extends Component {
  static propTypes = {
    imageUri: PropTypes.string,
    setImageUri: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
  };
  
  constructor(props) {
    super(props);
  }
  
  openPhotoSelect = async () => {
    const selection = await new Promise((resolve) => {
      ActionSheet.show({
        options: ['Take Photo', 'Choose From Library', 'Cancel'],
        cancelButtonIndex: 2,
      }, resolve);
    });
    
    if (selection === 0) { // Take Photo
      await this.setImage(await ImagePicker.launchCameraAsync({}));
    } else if (selection === 1) { // Choose From Library
      await this.setImage(await ImagePicker.launchImageLibraryAsync({}));
    }
  };
  
  async setImage(result) {
    if (!result.cancelled) {
      const { uri, height, width } = result;
      const largestSide = Math.max(height, width);
      
      if (largestSide > MAXIMUM_DIMENSION) {
        
        const scale = Math.min(MAXIMUM_DIMENSION / largestSide, 1);
        
        try {
          const croppedUri = await new Promise((resolve, reject) => {
            ImageEditor.cropImage(
              uri,
              {
                offset: { x: 0, y: 0 },
                size: { height, width },
                displaySize: {
                  height: Math.round(height * scale),
                  width: Math.round(width * scale)
                },
                resizeMode: 'cover',
              },
              resolve,
              reject
            );
          });
          this.props.setImageUri(croppedUri);
        } catch (e) {
          showError('Failed to resize image');
          console.error(e);
        }
      } else {
        this.props.setImageUri(uri);
      }
    }
  }
  
  render() {
    return (
      <TouchableOpacity onPress={this.openPhotoSelect} activeOpacity={0.8}>
        {this.props.imageUri ? (
          <Image
            source={{ uri: this.props.imageUri }}
            style={styles.image}
          />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="camera" style={{ color: '#FFF', fontSize: 96 }}/>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#666',
    height: 240,
    width: null,
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: '#666',
    flexDirection: 'row',
    height: 240,
    justifyContent: 'center',
    width: null,
  },
});