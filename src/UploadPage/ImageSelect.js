import { ImagePicker } from 'expo';
import { Body, Button, CardItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Image } from 'react-native';

class ImageSelect extends Component {
  static propTypes = {
    image: PropTypes.string,
    setImage: PropTypes.func.isRequired,
  };
  
  render() {
    const source = this.props.image ?
      { uri: this.props.image }
      : require('../../rainwork_placeholder.png');
    return (
      <Fragment>
        <CardItem cardBody>
          <Image
            source={source}
            style={{
              width: null,
              height: 240,
              flex: 1,
            }}
          />
        </CardItem>
        <CardItem style={{ flex: 1 }}>
          <Body>
            <Button onPress={this.pickImage}>
              <Text>Choose an image</Text>
            </Button>
            <Button onPress={this.takePhoto}>
              <Text>Take a photo</Text>
            </Button>
          </Body>
        </CardItem>
      </Fragment>
    );
  }
  
  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({});
    if (!result.cancelled) {
      this.props.setImage(result.uri);
    }
  };
  
  takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({});
    if (!result.cancelled) {
      this.props.setImage(result.uri);
    }
  };
}

export default ImageSelect;