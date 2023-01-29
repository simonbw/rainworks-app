import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Icon, View } from "native-base";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ACTION_COLOR, WHITE } from "../constants/Colors";
import { LocationConsumer } from "../contexts/LocationContext";
import { coordsToRegion, rainworkToCoords } from "../../utils/mapUtils";

class InitToggleableMapView extends Component {
  static propTypes = {
    initialMapType: PropTypes.oneOf(["hybrid", "standard"]),
    children: PropTypes.node,
    selectedRainwork: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      mapType: this.props.initialMapType || "standard",
      selectedRegion:
        this.props.selectedRainwork &&
        coordsToRegion(rainworkToCoords(this.props.selectedRainwork)),
      mapWidth: "99%",
    };
  }

  toggleMapType = () => {
    const mapType = this.state.mapType === "hybrid" ? "standard" : "hybrid";
    this.setState({ mapType });
  };

  UNSAFE_componentWillMount() {
    //Hack to ensure the showsMyLocationButton is shown initially. Idea is to force a repaint
    // setTimeout(() => this.setState({ paddingTop: 1 }), 500);
    // setTimeout(() => this.setState({ paddingTop: 0 }), 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedRainwork !== this.props.selectedRainwork) {
      this.setState({
        selectedRegion: coordsToRegion(
          rainworkToCoords(this.props.selectedRainwork)
        ),
      });
    }
  }

  render() {
    return (
      <LocationConsumer>
        {(userLocation) => {
          const userRegion = userLocation
            ? coordsToRegion(userLocation.coords)
            : undefined;
          return (
            <Fragment>
              <MapView
                ref={(r) => (this._mapRef = r)}
                style={{
                  // ...StyleSheet.absoluteFillObject,
                  height: "100%",
                  width: this.state.mapWidth,
                }}
                mapType={this.state.mapType}
                {...this.props.otherProps}
                initialRegion={this.state.selectedRegion || userRegion}
                // region={this.state.selectedRegion || userRegion}
                customMapStyle={googleMapStyle}
                onMapReady={() => this.setState({ mapWidth: "100%" })}
                provider={PROVIDER_GOOGLE}
              >
                {userRegion && (
                  <Marker coordinate={userRegion}>
                    <View style={styles.currentLocationMarker} />
                  </Marker>
                )}
                {this.props.children || null}
              </MapView>
              <View style={styles.buttonSheet}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.4}
                  onPress={() => this._mapRef.animateToRegion(userRegion)}
                >
                  <Icon name="locate" style={{ color: ACTION_COLOR }} />
                </TouchableOpacity>
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

const googleMapStyle = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const styles = StyleSheet.create({
  buttonSheet: {
    bottom: 0,
    justifyContent: "flex-end",
    left: 0,
    position: "absolute",
    padding: 6,
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
    width: 48,
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
    width: 16,
  },
});

export default InitToggleableMapView;
