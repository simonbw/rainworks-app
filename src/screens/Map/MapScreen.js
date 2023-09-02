import { View } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { RainworksConsumer } from "../../contexts/RainworksContext";
import ToggleableMapView from "../../components/ToggleableMapView";
import RainworkMarker from "./RainworkMarker";

class MapScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    rainworks: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    refreshAll: PropTypes.func.isRequired,
    refreshRainwork: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this._markers = {};
  }

  componentDidMount() {
    if (!this.props.loading) {
      this.props.refreshAll();
    }

    const selectedRainwork = this.getSelectedRainwork();

    if (selectedRainwork) {
      const marker = this._markers[selectedRainwork["id"]];
      if (marker) {
        setTimeout(() => {
          // I'm not exactly sure why this had to be asynchronous, but it works
          marker.showCallout();
        }, 0);
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Check the previous navigation state params props to see if it doesn't match
    if (prevProps.route.params !== this.props.route.params) {
      const selectedRainwork = this.getSelectedRainwork();
      if (selectedRainwork) {
        const marker = this._markers[selectedRainwork["id"]];
        if (marker) {
          setTimeout(() => {
            // I'm not exactly sure why this had to be asynchronous, but it works
            marker.showCallout();
          }, 0);
        }
      }
    } else {
      const selectedRainwork = this.getSelectedRainwork();
      if (selectedRainwork) {
        const marker = this._markers[selectedRainwork["id"]];
        if (marker) {
          setTimeout(() => {
            // I'm not exactly sure why this had to be asynchronous, but it works
            marker.showCallout();
          }, 0);
        }
      }
    }
  }
  getSelectedRainwork() {
    const params = this.props.route.params;
    if (params) {
      const marker = this._markers[params.selectedRainwork["id"]];

      if (marker) {
        setTimeout(() => {
          // I'm not exactly sure why this had to be asynchronous, but it works
          marker.showCallout();
        }, 0);
      }

      return params.selectedRainwork;
    }
    return undefined;
  }

  render() {
    return (
      <View
        style={{
          alignItems: "stretch",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <ToggleableMapView selectedRainwork={this.getSelectedRainwork()}>
          {this.props.rainworks.map((rainwork) => (
            <RainworkMarker
              key={rainwork["id"]}
              rainwork={rainwork}
              markerRef={(c) => (this._markers[rainwork["id"]] = c)}
              navigation={this.props.navigation}
            />
          ))}
        </ToggleableMapView>
        {this.props.loading && (
          <ActivityIndicator
            size={"large"}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
            }}
          />
        )}
      </View>
    );
  }
}

export default ({ navigation, route }) => (
  <RainworksConsumer>
    {({ activeRainworks, loading, refreshAll }) => (
      <MapScreen
        loading={loading}
        navigation={navigation}
        route={route}
        rainworks={activeRainworks}
        refreshAll={refreshAll}
      />
    )}
  </RainworksConsumer>
);