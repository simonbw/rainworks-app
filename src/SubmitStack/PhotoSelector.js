import { ImagePicker } from 'expo';
import { ActionSheet, Icon, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

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