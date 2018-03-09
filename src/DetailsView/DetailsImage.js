import { Icon, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { CacheManager, Image } from "react-native-expo-image-cache";
import ImageView from 'react-native-image-view';

class DetailsImage extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cachedUri: null,
    }
  }
  
  async componentDidMount() {
    const cachedUri = await new Promise(resolve => CacheManager.cache(this.props.imageUrl, resolve));
    this.setState({ cachedUri })
  }
  
  render() {
    return this.state.cachedUri ? (
      <Fragment>
        <TouchableHighlight onPress={() => this.setState({ open: true })}>
          <Image
            style={styles.image}
            resizeMode={'cover'}
            resizeMethod={'scale'}
            uri={this.props.imageUrl}
          />
        </TouchableHighlight>
        <ImageView
          isVisible={this.state.open}
          source={{ uri: this.state.cachedUri }}
          onClose={() => this.setState({ open: false })}
          animationType={'fade'}
          imageHeight={undefined} // everything seems to work fine with these being undefined
          imageWidth={undefined}
        />
      </Fragment>
    ) : (
      <View style={styles.placeholder}>
        <Icon name="image" style={{ color: '#FFF', fontSize: 96 }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: null,
    height: 240,
    flex: 1,
    backgroundColor: '#666',
  },
  placeholder: {
    width: null,
    height: 240,
    flex: 1,
    backgroundColor: '#666',
  },
});

export default DetailsImage;