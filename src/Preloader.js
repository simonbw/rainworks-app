import { AppLoading, Asset } from 'expo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CacheManager } from 'react-native-expo-image-cache';
import { showError } from './util';

class Preloader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    };
  }
  
  render() {
    return this.state.ready ? this.props.children : this.renderLoading();
  }
  
  renderLoading() {
    return (
      <AppLoading
        startAsync={this.cacheAssets}
        onError={(e) => {
          this.setState({ ready: true });
          showError('Error loading resources');
          console.error(e);
        }}
        onFinish={() => this.setState({ ready: true })}
      />
    )
  }
  
  cacheAssets = async () => {
    await CacheManager.clearCache(); // TODO: Something better than this
    await Promise.all([
      Expo.Font.loadAsync({
        // 'Rainworks': require('../assets/Rainworks.ttf'),
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      }),
      Asset.loadAsync([
        require('../assets/bundled/pin_unfound.png'),
        require('../assets/bundled/pin_found.png'),
        require('../assets/bundled/header.png'),
        require('react-navigation/src/views/assets/back-icon.png'),
        require('react-navigation/src/views/assets/back-icon-mask.png'),
      ]),
      Asset.loadAsync([ // TODO: Only preload this on first open
        require('../assets/bundled/intro.mp4'),
      ]),
    ]);
  }
}

export default Preloader;