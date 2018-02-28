import PropTypes from 'prop-types';
import React, { Component } from 'react';

const RAINWORKS_URL = 'https://rainworks-backend.herokuapp.com/rainworks';

// TODO: probably separate this out by context

class RainworksProvider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      rainworks: [],
      loading: false
    };
  }
  
  componentDidMount() {
    this.loadRainworks();
  }
  
  loadRainworks() {
    this.setState({ loading: true });
    fetch(RAINWORKS_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ rainworks: data, loading: false });
      });
  }
  
  render() {
    return this.props.children(this.state.rainworks, this.state.loading);
  }
}

export default RainworksProvider;