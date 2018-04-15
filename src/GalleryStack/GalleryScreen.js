import { View } from 'native-base';
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, Platform } from 'react-native';
import { RainworksConsumer } from '../contexts/RainworksContext';
import GalleryItem from './GalleryItem';

function getInitialNum() {
  const { height, width } = Dimensions.get('window');
  return Math.ceil(2 * height / width);
}

const GalleryScreen = ({ navigation }) => (
  <RainworksConsumer>
    {({ rainworksWithImages, loading, refreshAll }) => (
      <FlatList
        removeClippedSubviews={Platform.OS === 'android'}
        data={rainworksWithImages}
        numColumns={2}
        refreshing={loading}
        keyExtractor={(rainwork) => String(rainwork['id'])}
        renderItem={({ item }) => <GalleryItem rainwork={item} navigation={navigation}/>}
        onRefresh={refreshAll}
        initialNumToRender={getInitialNum()}
      />
    )}
  </RainworksConsumer>
);

export default GalleryScreen;