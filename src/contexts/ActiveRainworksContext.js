import createContext from 'create-react-context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RAINWORKS_URL } from '../urls';

const Context = createContext({});

export const ActiveRainworksConsumer = Context.Consumer;

export class ActiveRainworksProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      rainworks: [],
      loading: false
    };
  }
  
  async componentDidMount() {
    await this.loadRainworks();
  }
  
  async loadRainworks() {
    this.setState({ loading: true });
    const response = await fetch(RAINWORKS_URL);
    const data = await response.json();
    this.setState({ rainworks: data, loading: false });
  }
  
  getProviderValue() {
    return {
      ...this.state,
      refresh: () => this.loadRainworks()
    }
  }
  
  render() {
    return (
      <Context.Provider value={this.getProviderValue()}>
        {this.props.children || null}
      </Context.Provider>
    );
  }
}