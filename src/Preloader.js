import { AppLoading, Asset } from 'expo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
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
    await Promise.all([
      Expo.Font.loadAsync({
        // 'Rainworks': require('../assets/Rainworks.ttf'),
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      }),
      Asset.loadAsync([
        require('../assets/pin_unfound.png'),
        require('../assets/pin_found.png'),
        require('../assets/header.png'),
        require('react-navigation/src/views/assets/back-icon.png'),
        require('react-navigation/src/views/assets/back-icon-mask.png'),
      ]),
    ]);
  }
}

export default Preloader;