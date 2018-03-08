import { View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { ActiveRainworksConsumer } from '../contexts/ActiveRainworksContext';
import ToggleableMapView from '../ToggleableMapView';
import RainworkMarker from './RainworkMarker';

class MapScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    rainworks: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    refreshAll: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    if (!this.props.loading) {
      this.props.refreshAll();
    }
  }
  
  render() {
    return (
      <View
        style={{
          alignItems: 'stretch',
          flex: 1,
          justifyContent: 'flex-end'
        }}
      >
        <ToggleableMapView>
          {this.props.rainworks.map((rainwork) => (
            <RainworkMarker
              rainwork={rainwork}
              key={rainwork['id']}
            />
          ))}
        </ToggleableMapView>
        {this.props.loading && (
          <ActivityIndicator
            size={'large'}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
            }}
          />
        )}
      </View>
    );
  };
}

export default ({ navigation }) => (
  <ActiveRainworksConsumer>
    {({ rainworks, loading, refreshAll }) => (
      <MapScreen navigation={navigation} rainworks={rainworks} loading={loading} refreshAll={refreshAll}/>
    )}
  </ActiveRainworksConsumer>
);