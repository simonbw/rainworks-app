import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { AsyncStorage, Modal, StatusBar } from 'react-native';
import { RAINWORKS_BLUE } from '../constants/Colors';
import WelcomeScreenContent from './WelcomeScreenContent';
import WelcomeScreenVideo from './WelcomeScreenVideo';

const SEEN_KEY = 'HAS_SEEN_WELCOME_SCREEN';

// States
const UNKNOWN = -1;
const MODAL_OPENING = 0;
const VIDEO_PLAYING = 1;
const VIDEO_FADING = 2;
const VIDEO_DONE = 3;
const MODAL_CLOSING = 4;
const HAS_SEEN = 5;

class WelcomeScreen extends Component {
  static propTypes = {
    children: PropTypes.node,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      phase: UNKNOWN,
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
  
  async componentDidMount() {
    if (await this.checkIfSeen()) {
      this.setState({ phase: HAS_SEEN });
    } else {
      this.setState({ phase: MODAL_OPENING });
    }
  }
  
  async closeModal() {
    this.setState({ phase: HAS_SEEN });
    await AsyncStorage.setItem(SEEN_KEY, 'true')
  }
  
  render() {
    const phase = this.state.phase;
    return (
      <Fragment>
        {phase > UNKNOWN && this.props.children}
        {phase > UNKNOWN && phase < HAS_SEEN && (
          <Modal
            onRequestClose={() => this.closeModal()}
            animationType={'slide'}
            onShow={() => this.setState({ phase: VIDEO_PLAYING })}
            style={{ backgroundColor: RAINWORKS_BLUE }}
          >
            <StatusBar hidden={phase === VIDEO_PLAYING} barStyle={'dark-content'}/>
            {phase > VIDEO_PLAYING && (
              <WelcomeScreenContent close={() => this.closeModal()}/>
            )}
            {phase > UNKNOWN && phase <= VIDEO_FADING && (
              <WelcomeScreenVideo
                onVideoEnd={() => this.setState({ phase: VIDEO_FADING })}
                onFadeDone={() => this.setState({ phase: VIDEO_DONE })}
              />
            )}
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default WelcomeScreen;