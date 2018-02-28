import { ImagePicker } from 'expo';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { ActionSheetIOS, Image, TouchableHighlight } from 'react-native';

export default class PhotoSelector extends Component {
  static propTypes = {
    imageUri: PropTypes.string,
    setImageUri: PropTypes.func.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      pickerOpen: false,
    }
  }
  
  openPhotoSelect = async () => {
    console.log('openPhotoSelect');
    this.setState({ pickerOpen: true });
    
    const selection = await new Promise((resolve) => {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Take Photo', 'Choose From Library', 'Cancel'],
        cancelButtonIndex: 2
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
      : require('../../rainwork_placeholder.png');
    return (
      <Fragment>
        
        <TouchableHighlight onPress={this.openPhotoSelect}>
          <Image
            source={source}
            style={{
              width: null,
              height: 240,
            }}
          />
        </TouchableHighlight>
        {this.state.pickerOpen && (
          null
        )}
      </Fragment>
    );
  }
}