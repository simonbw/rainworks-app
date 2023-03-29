import React, { Component } from "react";
// import createContext from "create-react-context";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import PropTypes from "prop-types";

const Context = React.createContext({});

export const LocationConsumer = Context.Consumer;

export class LocationProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      userLocation: null,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      await Location.watchPositionAsync({}, (userLocation) => {
        this.setState({ userLocation });
      });
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
