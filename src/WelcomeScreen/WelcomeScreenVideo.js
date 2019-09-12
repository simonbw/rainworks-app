import { Video } from "expo-av";
import KeepAwake from "../Common/KeepAwake";
import { Text } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { RAINWORKS_BLUE, WHITE } from "../constants/Colors";

const NATURAL_FADE = 800;
const SKIP_FADE = 300;
const QUICK_FADE = 100;

class WelcomeScreenVideo extends Component {
  static propTypes = {
    onVideoEnd: PropTypes.func.isRequired,
    onFadeDone: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this._fadeAnimation = new Animated.Value(1.0);
  }

  close(duration) {
    if (!this._closing) {
      console.log("closing");
      this._closing = true;
      this._videoRef.setIsMutedAsync(true);
      this.props.onVideoEnd();
      Animated.timing(this._fadeAnimation, {
        toValue: 0.0,
        duration: duration
      }).start(() => this.props.onFadeDone());
    }
  }

  render() {
    return (
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: RAINWORKS_BLUE,
          opacity: this._fadeAnimation
        }}
      >
        <KeepAwake />
        <Video
          ref={r => (this._videoRef = r)}
          style={{
            flex: 1
          }}
          resizeMode="cover"
          source={require("../../assets/bundled/intro.mp4")}
          shouldPlay
          usePoster
          onPlaybackStatusUpdate={({
            didJustFinish,
            durationMillis,
            positionMillis,
            progressUpdateIntervalMillis
          }) => {
            // If we're almost at the end of the video
            if (
              durationMillis &&
              durationMillis - positionMillis <
                NATURAL_FADE + progressUpdateIntervalMillis
            ) {
              console.log(progressUpdateIntervalMillis);
              this.close(NATURAL_FADE);
            }
            // If we somehow missed the end of the video, close it quickly
            if (didJustFinish) {
              this.close(QUICK_FADE);
            }
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 12,
            right: 12
          }}
          onPress={() => this.close(SKIP_FADE)}
        >
          <Text style={{ color: WHITE }}>Skip</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default WelcomeScreenVideo;
