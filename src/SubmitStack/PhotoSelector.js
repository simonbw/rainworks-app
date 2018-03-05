import { ImagePicker } from 'expo';
import { ActionSheet } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';

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
    
    if (selection === 0) {
      await this.takePhoto();
    } else if (selection === 1) {
      await this.pickImage();
    }
  };
  
  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({});
    if (!result.cancelled) {
      this.props.setImageUri(result.uri);
    }
  };
  
  takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({});
    if (!result.cancelled) {
      this.props.setImageUri(result.uri);
    }
  };
  
  render() {
    const source = this.props.imageUri ?
      { uri: this.props.imageUri }
      : require('../../assets/rainwork_placeholder.png');
    return (
      <TouchableHighlight onPress={this.openPhotoSelect}>
        <Image
          source={source}
          style={{
            width: null,
            height: 240,
          }}
        />
      </TouchableHighlight>
    );
  }
}