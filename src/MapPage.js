import { MapView } from 'expo';
import { Content, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal, StyleSheet } from 'react-native';
import DetailsPage from './DetailsPage';

export default class MapPage extends Component {
  static propTypes = {
    rainWorks: PropTypes.array.isRequired
  };
  
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 47.668,
        longitude: -122.282,
        latitudeDelta: 0.02,
        longitudeDelta: 0.01,
      },
      currentlySelected: null
    }
  }
  
  select(currentlySelected) {
    this.setState({ currentlySelected });
  }
  
  unselect() {
    this.setState({ currentlySelected: null })
  }
  
  render() {
    return (
      <Content contentContainerStyle={styles.container}>
        <MapView
          style={styles.mapView}
          initialRegion={this.state.region}
          onRegionChange={(region) => this.setState({ region })}
        >
          {this.props.rainWorks.map((rainwork) => (
            <MapView.Marker
              coordinate={{
                latitude: rainwork.lat,
                longitude: rainwork.lng,
              }} key={rainwork.id}
              onPress={() => this.select(rainwork)}
            />
          ))}
        </MapView>
        <Modal
          transparent
          animationType={'fade'}
          onRequestClose={() => this.unselect()}
          visible={Boolean(this.state.currentlySelected)}
        >
          {this.state.currentlySelected && (
            <DetailsPage
              rainwork={this.state.currentlySelected}
              onClose={() => {
                console.log('closing');
                this.unselect();
              }}
            />
          )}
        </Modal>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'flex-end'
  },
  mapView: {
    flex: 1
  }
});
