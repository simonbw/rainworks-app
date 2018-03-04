import { MapView } from 'expo';
import { Icon, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LocationConsumer } from './contexts/LocationContext';

const locationToRegion = (l) => {
  return {
    latitude: l.latitude,
    longitude: l.longitude,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  }
};

class ToggleableMapView extends Component {
  static propTypes = {
    initialMapType: PropTypes.oneOf(['hybrid', 'standard']),
    children: PropTypes.node,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      mapType: this.props.initialMapType || 'standard'
    }
  }
  
  toggleMapType = () => {
    const mapType = this.state.mapType === 'hybrid' ? 'standard' : 'hybrid';
    this.setState({ mapType })
  };
  
  render() {
    const { initialMapType, children, ...otherProps } = this.props;
    return (
      <LocationConsumer>
        {(userLocation) => {
          const userRegion = userLocation ? locationToRegion(userLocation.coords) : undefined;
          return (
            <Fragment>
              <MapView
                ref={(r) => this._mapRef = r}
                style={{ flex: 1 }}
                mapType={this.state.mapType}
                {...otherProps}
                initialRegion={userRegion}
              >
                {userRegion && (
                  <MapView.Marker coordinate={userRegion}>
                    <View style={styles.currentLocationMarker}/>
                  </MapView.Marker>
                )}
                {this.props.children || null}
              </MapView>
              <View style={styles.buttonSheet}>
                {userRegion && (
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.4}
                    onPress={() => this._mapRef.animateToRegion(userRegion)}
                  >
                    <Icon name="locate" style={{ color: '#4F8EF7' }}/>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.4}
                  onPress={this.toggleMapType}
                >
                  <Icon name="eye"/>
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
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    padding: 6,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 100,
    height: 48,
    justifyContent: 'center',
    margin: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 48,
  },
  currentLocationMarker: {
    backgroundColor: '#4F8EF7',
    borderColor: '#FFF',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth * 5,
    height: 16,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 16,
  }
});

export default ToggleableMapView;