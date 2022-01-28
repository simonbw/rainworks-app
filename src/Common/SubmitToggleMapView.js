import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Icon, View } from "native-base";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ACTION_COLOR, WHITE } from "../constants/Colors";
import { LocationConsumer } from "../contexts/LocationContext";
import { coordsToRegion, rainworkToCoords } from "../utils/mapUtils";

class SubmitToggleableMapView extends Component {
  static propTypes = {
    initialMapType: PropTypes.oneOf(["hybrid", "standard"]),
    children: PropTypes.node,
    selectedRainwork: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      mapType: this.props.initialMapType || "standard"
    };
  }

  toggleMapType = () => {
    const mapType = this.state.mapType === "hybrid" ? "standard" : "hybrid";
    this.setState({ mapType });
  };

  render() {
    const {
      initialMapType,
      children,
      selectedRainwork,
      ...otherProps
    } = this.props;
    const selectedRegion =
      selectedRainwork && coordsToRegion(rainworkToCoords(selectedRainwork));
    return (
      <LocationConsumer>
        {userLocation => {
          const userRegion = userLocation
            ? coordsToRegion(userLocation.coords)
            : undefined;
          return (
            <Fragment>
              <MapView
                ref={r => (this._mapRef = r)}
                style={StyleSheet.absoluteFillObject}
                mapType={this.state.mapType}
                {...otherProps}
                initialRegion={selectedRegion || userRegion}
                showsUserLocation={true}
                showsMyLocationButton={false}
                provider={PROVIDER_GOOGLE}
              >
                {userRegion && (
                  <Marker coordinate={userRegion}>
                    <View style={styles.currentLocationMarker} />
                  </Marker>
                )}
                {children || null}
              </MapView>
              <View style={styles.buttonSheet}>
                {userRegion && (
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.4}
                    onPress={() => this._mapRef.animateToRegion(userRegion)}
                  >
                    <Icon name="locate" style={{ color: ACTION_COLOR }} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.4}
                  onPress={this.toggleMapType}
                >
                  <Icon name="eye" />
                </TouchableOpacity>
              </View>
            </Fragment>
          );
        }}
      </LocationConsumer>
    );
  }
}

const styles = StyleSheet.create({
  buttonSheet: {
    bottom: 0,
    justifyContent: "flex-end",
    left: 0,
    position: "absolute",
    padding: 6
  },
  button: {
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 100,
    height: 48,
    justifyContent: "center",
    margin: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 48
  },
  currentLocationMarker: {
    backgroundColor: ACTION_COLOR,
    borderColor: WHITE,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth * 5,
    height: 16,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 16
  }
});

export default SubmitToggleableMapView;