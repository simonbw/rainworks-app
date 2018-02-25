import { Container } from 'native-base';
import React, { Component } from 'react';
import MapPage from './MapPage';
import RainworksProvider from './RainworksProvider';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      rainworks: []
    }
  }
  
  render() {
    return (
      <Container>
        <RainworksProvider>
          {(rainworks) => (
            <MapPage rainWorks={rainworks}/>
          )}
        </RainworksProvider>
      </Container>
    );
  }
}
