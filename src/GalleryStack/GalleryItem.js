import { Icon, View } from "native-base";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { DARK_GRAY, GRAY } from "../constants/Colors";
import { GALLERY_DETAILS_SCREEN } from "./ScreenNames";

class GalleryItem extends PureComponent {
  render() {
    const { rainwork, navigation } = this.props;
    return (
      <View style={styles.item}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate(GALLERY_DETAILS_SCREEN, { rainwork })
          }
        >
          {rainwork["image_url"] ? (
            true || Platform.OS === "ios" ? (
              <CachedImage
                style={styles.image}
                resizeMode={"cover"}
                resizeMethod={"scale"}
                uri={rainwork["thumbnail_url"] || rainwork["image_url"]}
              />
            ) : (
              // TODO: Figure out how to get the cached images to work right on android
              <Image
                style={styles.image}
                resizeMode={"cover"}
                resizeMethod={"scale"}
                source={{
                  uri: rainwork["thumbnail_url"] || rainwork["image_url"]
                }}
              />
            )
          ) : (
            <View style={styles.placeholder}>
              <Icon name="image" style={{ color: GRAY, fontSize: 96 }} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export const getSize = () => {
  const size = Dimensions.get("window").width / 2;
  return { width: size, height: size };
};

GalleryItem.propTypes = {
  rainwork: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  item: {
    height: Dimensions.get("window").width / 2,
    flex: 1
  },
  image: {
    backgroundColor: DARK_GRAY,
    height: "100%"
  },
  placeholder: {
    alignItems: "center",
    backgroundColor: DARK_GRAY,
    height: "100%",
    justifyContent: "center"
  }
});

export default GalleryItem;
