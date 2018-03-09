import PropTypes from 'prop-types';
import React from 'react';
import { LocationConsumer } from './contexts/LocationContext';
import { getDistanceFromLatLonInKm } from './util';

// Display certain content only when user is within a certain distance of a location
const LocationRestricted = (props) => {
  return (
    <LocationConsumer>
      {(userLocation) => {
        if (!userLocation) {
          return props.outside;
        }
        const { latitude, longitude } = userLocation.coords;
        const distance = getDistanceFromLatLonInKm(props.lat, props.lng, latitude, longitude);
        if (distance <= props.maximumDistance) {
          return props.inside;
        } else {
          return props.outside;
        }
      }}
    </LocationConsumer>
  );
};

LocationRestricted.propTypes = {
  inside: PropTypes.node.isRequired,
  outside: PropTypes.node.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  maximumDistance: PropTypes.number.isRequired,
};

export default LocationRestricted;