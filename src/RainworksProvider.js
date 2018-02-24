import PropTypes from 'prop-types';
import React, { Component } from 'react';

let RAINWORKS_URL = 'https://rainworks-backend.herokuapp.com/rainworks';

class RainworksProvider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      rainworks: []
    };
  }
  
  componentDidMount() {
    this.loadRainworks();
  }
  
  loadRainworks() {
    fetch(RAINWORKS_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ rainworks: data })
      });
  }
  
  render() {
    return this.props.children(this.state.rainworks);
  }
}

export default RainworksProvider;