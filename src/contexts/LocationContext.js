import createContext from 'create-react-context';
import { Location, Permissions } from 'expo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const Context = createContext({});

export const LocationConsumer = Context.Consumer;

export class LocationProvider extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  
  constructor(props) {
    super(props);
    this.state = {
      userLocation: null
    }
  }
  
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      await Location.watchPositionAsync({}, (userLocation) => {
        console.log('User Position Updated', userLocation);
        this.setState({ userLocation });
      });
    } else {
      console.log('Location Permission Denied')
    }
  }
  
  render() {
    return (
      <Context.Provider value={this.state.userLocation}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
