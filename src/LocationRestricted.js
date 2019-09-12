import PropTypes from "prop-types";
import React from "react";
import { LocationConsumer } from "./contexts/LocationContext";
import { getDistanceFromLatLonInKm } from "./utils/util";

// Display certain content only when user is within a certain distance of a location
const LocationRestricted = props => {
  return (
    <LocationConsumer>
      {userLocation => {
        if (!userLocation) {
          return props.renderNoLocationServices === undefined
            ? props.renderOutside
            : props.renderNoLocationServices;
        }
        const { latitude, longitude } = userLocation.coords;
        const distance = getDistanceFromLatLonInKm(
          props.lat,
          props.lng,
          latitude,
          longitude
        );
        if (distance <= props.maximumDistance) {
          return props.renderInside;
        } else {
          return props.renderOutside;
        }
      }}
    </LocationConsumer>
  );
};

LocationRestricted.propTypes = {
  renderInside: PropTypes.node.isRequired,
  renderOutside: PropTypes.node.isRequired,
  renderNoLocationServices: PropTypes.node,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  maximumDistance: PropTypes.number.isRequired
};

export default LocationRestricted;
