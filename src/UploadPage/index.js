import { Button, Text, View } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import UploadPageCard from './UploadPageCard';

class UploadPageContainer extends Component {
  static propTypes = {};
  
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  
  render() {
    return this.state.open ? this.renderOpen() : this.renderClosed();
  }
  
  renderClosed() {
    return (
      <View style={styles.buttonContainer}>
        <Button onPress={() => this.setState({ open: true })}>
          <Text>+</Text>
        </Button>
      </View>
    );
  }
  
  renderOpen() {
    return (
      <View style={styles.cardContainer}>
        <UploadPageCard/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    bottom: 12,
    position: 'absolute',
    right: 12,
  },
  cardContainer: {
    bottom: 12,
    flex: 1,
    left: 12,
    position: 'absolute',
    right: 12,
    top: 12,
  }
});

export default UploadPageContainer;