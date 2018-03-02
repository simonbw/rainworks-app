import { MapView } from 'expo';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { TouchableOpacity } from 'react-native';

class ToggleableMapView extends Component {
  static propTypes = {
    initialMapType: PropTypes.oneOf('hybrid', 'standard'),
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
      <Fragment>
        <MapView style={{ flex: 1 }} mapType={this.state.mapType} {...otherProps}>
          {this.props.children || null}
        </MapView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: '#6AF',
            borderRadius: 100,
            height: 36,
            width: 36,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={0.4}
          onPress={this.toggleMapType}
        >
          <Icon name={'eye'}/>
        </TouchableOpacity>
      </Fragment>
    );
  }
}

export default ToggleableMapView;