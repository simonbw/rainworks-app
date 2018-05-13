import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import { RainworksConsumer } from '../contexts/RainworksContext';
import GalleryItem, { getSize } from './GalleryItem';

function getInitialNum() {
  const { height, width } = Dimensions.get('window');
  return Math.ceil(2 * height / width);
}

const GalleryScreen = ({ navigation }) => (
  <RainworksConsumer>
    {({ galleryRainworks, loading, refreshAll }) => (
      <FlatList
        removeClippedSubviews
        data={galleryRainworks}
        numColumns={2}
        refreshing={loading}
        keyExtractor={(rainwork) => String(rainwork['id'])}
        renderItem={({ item }) => <GalleryItem rainwork={item} navigation={navigation}/>}
        onRefresh={refreshAll}
        initialNumToRender={getInitialNum()}
        
        getItemLayout={(data, index) => {
          const { height } = getSize();
          return { length: height, offset: height * index, index };
        }}
      />
    )}
  </RainworksConsumer>
);

export default GalleryScreen;