import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Image, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import ImageView from 'react-native-image-view';

class DetailsImage extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  
  render() {
    const imageSource = { uri: this.props.imageUrl, cache: 'force-cache' };
    return (
      <Fragment>
        <TouchableHighlight onPress={() => this.setState({ open: true })}>
          <Image
            style={styles.image}
            resizeMode={'cover'}
            resizeMethod={'scale'}
            source={imageSource}
          />
        </TouchableHighlight>
        <ImageView
          isVisible={this.state.open}
          source={imageSource}
          onClose={() => this.setState({ open: false })}
          animationType={'fade'}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: null,
    height: 240,
    flex: 1,
    backgroundColor: '#333',
  },
  modal: {
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: '#FFF',
    fontSize: 48,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default DetailsImage;