import React from "react";
import { Dimensions, FlatList } from "react-native";
import { useRainworksContext } from "../contexts/RainworksContext";
import GalleryItem, { getSize } from "./GalleryItem";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<{}>;
}
export default function GalleryScreen({ navigation }: Props) {
  const { galleryRainworks, loading, refreshAll } = useRainworksContext();

  return (
    <FlatList
      removeClippedSubviews
      data={galleryRainworks}
      numColumns={2}
      refreshing={loading}
      keyExtractor={rainwork => String(rainwork["id"])}
      renderItem={({ item }) => (
        <GalleryItem rainwork={item} navigation={navigation} />
      )}
      onRefresh={refreshAll}
      initialNumToRender={getInitialNum()}
      getItemLayout={(data, index) => {
        const { height } = getSize();
        return { length: height, offset: height * index, index };
      }}
    />
  );
}

function getInitialNum() {
  const { height, width } = Dimensions.get("window");
  return Math.ceil((2 * height) / width);
}
