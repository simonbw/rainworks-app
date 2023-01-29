import { Icon, View } from "native-base";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { Image, Platform, StyleSheet, TouchableHighlight } from "react-native";
import { CacheManager } from "react-native-expo-image-cache";
import ImageView from "react-native-image-viewing";
import { DARK_GRAY, GRAY } from "../../constants/Colors";

class DetailsImage extends Component {
  static propTypes = {
    imageUrl: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cachedUri: null,
    };
  }

  async componentDidMount() {
    if (this.props.imageUrl) {
      if (Platform.OS === "android") {
        this.setState({ cachedUri: this.props.imageUrl });
      } else {
        /// ios
        this.setState({
          cachedUri: await CacheManager.get(this.props.imageUrl).getPath(),
        });
      }
    }
  }

  render() {
    const cachedUri = this.state.cachedUri;
    return cachedUri ? (
      <Fragment>
        <TouchableHighlight onPress={() => this.setState({ open: true })}>
          <Image
            style={styles.image}
            resizeMode={"cover"}
            resizeMethod={"scale"}
            source={{ uri: cachedUri }}
          />
        </TouchableHighlight>
        <ImageView
          visible={this.state.open}
          images={[{ source: { uri: cachedUri } }]}
          onRequestClose={() => this.setState({ open: false })}
          animationType={"fade"}
        />
      </Fragment>
    ) : (
      <View style={styles.placeholder}>
        <Icon name="image" style={{ color: GRAY, fontSize: 96 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: null,
    height: 240,
    flex: 1,
    backgroundColor: DARK_GRAY,
  },
  placeholder: {
    width: null,
    height: 240,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DARK_GRAY,
  },
});

export default DetailsImage;
