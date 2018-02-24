import { Container, Content } from 'native-base';
import React, { Component } from 'react';
import MapPage from './MapPage';
import RainworksProvider from './RainworksProvider';

// Google Maps API Key:
// AIzaSyDR4UChtWxMb50yFH35wr5jyul19D_H2Ro

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
