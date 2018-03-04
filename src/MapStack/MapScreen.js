import { View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { ActivityIndicator } from 'react-native';
import { ActiveRainworksConsumer } from '../contexts/ActiveRainworksContext';
import ToggleableMapView from '../ToggleableMapView';
import RainworkMarker from './RainworkMarker';

class MapScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    rainworks: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired
  };
  
  componentDidMount() {
    if (!this.props.loading) {
      this.props.refresh();
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
        <Fragment>
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
        </Fragment>
      </View>
    );
  };
}

export default ({ navigation }) => (
  <ActiveRainworksConsumer>
    {({ rainworks, loading, refresh }) => (
      <MapScreen navigation={navigation} rainworks={rainworks} loading={loading} refresh={refresh}/>
    )}
  </ActiveRainworksConsumer>
);