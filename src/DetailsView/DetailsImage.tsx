import { Icon, View } from "native-base";
import React, { Fragment, useState, useEffect } from "react";
import { Image, Platform, StyleSheet, TouchableHighlight } from "react-native";
import { CacheManager } from "react-native-expo-image-cache";
import ImageView from "react-native-image-view";
import { DARK_GRAY, GRAY } from "../constants/Colors";

interface Props {
  imageUrl: string;
}

interface State {
  open: boolean;
  cachedUri: string | null;
}

export default function DetailsImage({ imageUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [cachedUri, setCachedUri] = useState(
    Platform.OS === "android" ? imageUrl : undefined
  );

  useEffect(() => {
    if (Platform.OS === "ios") {
      CacheManager.get(imageUrl, {})
        .getPath()
        .then(uri => setCachedUri(uri));
    }
  });

  return cachedUri ? (
    <Fragment>
      <TouchableHighlight onPress={() => setOpen(true)}>
        <Image
          style={styles.image}
          resizeMode={"cover"}
          resizeMethod={"scale"}
          source={{ uri: cachedUri }}
        />
      </TouchableHighlight>
      <ImageView
        isVisible={open}
        source={{ uri: cachedUri }}
        onClose={() => setOpen(false)}
        animationType={"fade"}
        imageHeight={undefined} // everything seems to work fine with these being undefined
        imageWidth={undefined}
      />
    </Fragment>
  ) : (
    <View style={styles.placeholder}>
      <Icon name="image" style={{ color: GRAY, fontSize: 96 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: undefined,
    height: 240,
    flex: 1,
    backgroundColor: DARK_GRAY
  },
  placeholder: {
    width: undefined,
    height: 240,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DARK_GRAY
  }
});
