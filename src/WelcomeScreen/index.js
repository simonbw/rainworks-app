import React, { Component } from 'react';
import { AsyncStorage, Modal } from 'react-native';
import WelcomeScreenContent from './WelcomeScreenContent';

const SEEN_KEY = 'HAS_SEEN_WELCOME_SCREEN';

class WelcomeScreen extends Component {
  static propTypes = {};
  
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  
  async checkIfSeen() {
    // if (__DEV__) {
    //   return false;
    // }
    try {
      return await AsyncStorage.getItem(SEEN_KEY) != null;
    } catch (error) {
      return false;
    }
  }
  
  async closeModal() {
    this.setState({ open: false });
    await AsyncStorage.setItem(SEEN_KEY, 'true')
  }
  
  async componentDidMount() {
    if (!await this.checkIfSeen()) {
      this.setState({ open: true });
    }
  }
  
  render() {
    return (
      <Modal
        visible={this.state.open}
        onRequestClose={() => this.closeModal()}
        animationType={'slide'}
      >
        <WelcomeScreenContent close={() => this.closeModal()}/>
      </Modal>
    );
  }
}

export default WelcomeScreen;