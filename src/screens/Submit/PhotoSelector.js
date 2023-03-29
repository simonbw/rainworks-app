import React, { useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import ActionSheet from "react-native-actions-sheet";
import { Icon, Text, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  DARK_GRAY,
  EXPIRED_COLOR,
  GRAY,
  LIGHT_GRAY,
  MENU_BG_GRAY,
  WHITE,
} from "../../constants/Colors";
import { showError } from "../../../utils/toastUtils";

const MAXIMUM_DIMENSION = 1024;

const PhotoSelector = (props) => {
  const actionSheetRef = useRef(null);

  const openPhotoSelect = async (selection) => {
    if (selection === 0) {
      // Take Photo
      const { granted } = await ImagePicker.getCameraPermissionsAsync();

      if (granted) {
        await setImage(
          await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })
        );
      }
    } else if (selection === 1) {
      // Choose From Library
      await setImage(
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
      );
    }
    actionSheetRef.current?.hide();
    props.ref.current?.hide();
  };

  const setImage = async (result) => {
    if (!result.cancelled) {
      const { uri, height, width } = result;
      const largestSide = Math.max(height, width);

      if (largestSide > MAXIMUM_DIMENSION) {
        const scale = Math.min(MAXIMUM_DIMENSION / largestSide, 1);

        try {
          props.setImageUri(uri);
        } catch (e) {
          showError("Failed to resize image");
          // console.error(e);
        }
      } else {
        props.setImageUri(uri);
      }
    }
  };

  const openPhotoSelector = () => {
    // if (props.ref) {
    //   props.ref.current?.show();
    //   return;
    // }
    actionSheetRef.current?.show();
  };

  return (
    <>
      <TouchableOpacity onPress={() => openPhotoSelector()} activeOpacity={0.8}>
        {props.imageUri ? (
          <Image source={{ uri: props.imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Icon
              as={Ionicons}
              name="camera"
              size={20}
              style={{ color: WHITE }}
            />
            <Text style={styles.placeholderText}>Tap to take a photo</Text>
          </View>
        )}
      </TouchableOpacity>
      {props.edit && (
        <TouchableOpacity
          style={styles.changeContainer}
          onPress={() => openPhotoSelector()}
        >
          <Text style={styles.changeText}>Change photo?</Text>
        </TouchableOpacity>
      )}
      <ActionSheet ref={actionSheetRef}>
        <View style={{ marginBottom: 50, marginTop: 20 }}>
          <TouchableOpacity onPress={() => openPhotoSelect(0)}>
            <Text style={styles.actionText}>Take Photo</Text>
          </TouchableOpacity>
          <View style={styles.hrLine} />
          <TouchableOpacity onPress={() => openPhotoSelect(1)}>
            <Text style={styles.actionText}>Choose From Library</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </>
  );
};

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
  actionText: { fontSize: 18, textAlign: "center", color: "#007AFF" },
  hrLine: {
    borderWidth: 1,
    borderColor: MENU_BG_GRAY,
    marginVertical: 14,
  },
  changeContainer: {
    position: "absolute",
    width: "100%",
    top: 100,
    padding: 12,
    backgroundColor: EXPIRED_COLOR,
  },
  changeText: {
    color: WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default PhotoSelector;
