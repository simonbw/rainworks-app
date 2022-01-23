import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { ActionSheet, Icon, Text, View } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { DARK_GRAY, GRAY, LIGHT_GRAY, WHITE } from "../constants/Colors";
import { showError } from "../utils/toastUtils";

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
      ActionSheet.show(
        {
          options: ["Take Photo", "Choose From Library", "Cancel"],
          cancelButtonIndex: 2,
        },
        resolve
      );
    });

    if (selection === 0) {
      // Take Photo
      // console.log(
      //   await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      // );
      await Permissions.askAsync(Permissions.CAMERA);
      await this.setImage(
        await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
      );
    } else if (selection === 1) {
      // Choose From Library
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      await this.setImage(
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
      );
    }
  };

  async setImage(result) {
    if (!result.cancelled) {
      const { uri, height, width } = result;
      const largestSide = Math.max(height, width);

      if (largestSide > MAXIMUM_DIMENSION) {
        const scale = Math.min(MAXIMUM_DIMENSION / largestSide, 1);

        try {
          // const croppedUri = await new Promise((resolve, reject) => {
          //   ImageEditor.cropImage(
          //     uri,
          //     {
          //       offset: { x: 0, y: 0 },
          //       size: { height, width },
          //       displaySize: {
          //         height: Math.round(height * scale),
          //         width: Math.round(width * scale)
          //       },
          //       resizeMode: "cover"
          //     },
          //     resolve,
          //     reject
          //   );
          // });
          this.props.setImageUri(uri);
        } catch (e) {
          showError("Failed to resize image");
          // console.error(e);
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
          <Image source={{ uri: this.props.imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="camera" style={{ color: WHITE, fontSize: 96 }} />
            <Text style={styles.placeholderText}>Tap to take a photo</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: DARK_GRAY,
    height: 240,
    width: null,
  },
  placeholder: {
    alignItems: "center",
    backgroundColor: DARK_GRAY,
    height: 240,
    justifyContent: "center",
    width: null,
  },
  placeholderText: {
    color: GRAY,
    fontSize: 20,
  },
});
