import { AppLoading, Asset } from 'expo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
        startAsync={this.cacheImages}
        onFinish={() => this.setState({ ready: true })}
      />
    )
  }
  
  cacheImages = async () => {
    await Asset.fromModule(require('../assets/rainwork_placeholder.png'));
  }
}

export default Preloader;