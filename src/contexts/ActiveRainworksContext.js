import createContext from 'create-react-context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RAINWORKS_URL } from '../urls';
import { showError } from '../util';

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
      rainworksWithImages: [],
      loading: false
    };
  }
  
  async componentDidMount() {
    await this.loadRainworks();
  }
  
  loadRainworks = async () => {
    this.setState({ loading: true });
    const response = await fetch(RAINWORKS_URL);
    if (!response.ok) {
      showError('Loading rainworks failed')
    } else {
      const rainworks = await response.json();
      rainworks.sort((a, b) => new Date(b['installation_date']) - new Date(a['installation_date']));
      this.setState({
        rainworks,
        rainworksWithImages: rainworks.filter((rainwork) => rainwork['image_url']),
        loading: false
      });
    }
  };
  
  refreshRainwork = async (rainworkId) => {
    // TODO: Make it possible to just refresh data on one rainwork
  };
  
  getProviderValue() {
    return {
      ...this.state,
      refreshAll: this.loadRainworks,
      refreshRainwork: this.refreshRainwork,
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