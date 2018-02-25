import { ImagePicker } from 'expo';
import { Body, Button, Card, CardItem, Right, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { RNS3 } from 'react-native-aws3';

class UploaderTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      open: false,
    }
  }
  
  render() {
    return this.state.open ? this.renderOpen() : this.renderClosed();
  }
  
  renderClosed() {
    return (
      <View style={styles.button}>
        <Button onPress={() => this.setState({ open: true })}>
          <Text>Upload</Text>
        </Button>
      </View>
    );
  }
  
  renderOpen() {
    const source = this.state.image ?
      { uri: this.state.image.uri }
      : require('../rainwork_placeholder.png');
    return (
      <View style={styles.preview}>
        <Card>
          <CardItem>
            <Body/>
            <Right>
              <Button onPress={() => this.setState({ open: false })}>
                <Text>Cancel</Text>
              </Button>
            </Right>
          </CardItem>
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
          <CardItem footer>
            <Body/>
            <Right>
              <Button disabled={!this.state.image} onPress={this.upload}>
                <Text>Upload</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  }
  
  setImage = (result) => {
    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: { uri: result.uri, type: result.type } });
    }
  };
  
  pickImage = async () => {
    this.setImage(await ImagePicker.launchImageLibraryAsync({}));
  };
  
  takePhoto = async () => {
    this.setImage(await ImagePicker.launchCameraAsync({}));
  };
  
  upload = async () => {
    console.log('uploading');
    const file = {
      uri: this.state.image.uri,
      name: Date.now() + 'test-image',
      type: 'image/jpg'
    };
    const options = {
      bucket: "rainworks-image-upload-test",
      region: "us-west-2",
      accessKey: "AKIAITYBPQCDENYNCLXQ",
      secretKey: "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",
      successActionStatus: 201
    };
    const response = await RNS3.put(file, options);
    if (response.status !== 201) {
      console.error("Failed to upload image to S3:", response);
    }
    console.log(response.body);
  }
}

const styles = StyleSheet.create({
  button: {
    bottom: 10,
    position: 'absolute',
    right: 10,
  },
  preview: {
    bottom: 12,
    flex: 1,
    left: 12,
    position: 'absolute',
    right: 12,
    top: 12,
  }
});

export default UploaderTest;