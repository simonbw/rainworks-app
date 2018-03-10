import { View } from 'native-base';
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { ActiveRainworksConsumer } from '../contexts/ActiveRainworksContext';
import GalleryItem from './GalleryItem';

function getInitialNum() {
  const { height, width } = Dimensions.get('window');
  return Math.ceil(2 * height / width);
}

const GalleryScreen = ({ navigation }) => (
  <ActiveRainworksConsumer>
    {({ rainworks, loading, refreshAll }) => (
      <FlatList
        data={rainworks}
        numColumns={2}
        refreshing={loading}
        keyExtractor={(rainwork) => rainwork['id']}
        renderItem={({ item }) => <GalleryItem rainwork={item} navigation={navigation}/>}
        onRefresh={refreshAll}
        initialNumToRender={getInitialNum()}
        ListEmptyComponent={(
          <View
            style={{
              padding: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {loading && <ActivityIndicator size={'large'}/>}
          </View>
        )}
      />
    )}
  </ActiveRainworksConsumer>
);

export default GalleryScreen;