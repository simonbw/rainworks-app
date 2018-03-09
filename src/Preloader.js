import { AppLoading, Asset } from 'expo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
        onError={() => {
          this.setState({ ready: true });
          showError('Error loading resources');
        }}
        onFinish={() => this.setState({ ready: true })}
      />
    )
  }
  
  cacheAssets = async () => {
    await Promise.all([
      Expo.Font.loadAsync({
        'Rainworks': require('../assets/Rainworks.ttf'),
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      }),
      Asset.loadAsync([
        require('../assets/icon.png')
      ]),
    ]);
  }
}

export default Preloader;