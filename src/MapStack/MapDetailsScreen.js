import React from "react";
import DetailsContent from "../DetailsView/DetailsContent";

const MapDetailsScreen = ({ navigation }) => {
  const rainwork = navigation.state.params.rainwork;
  return (
    <DetailsContent
      includeReports
      includeOpenInMaps
      rainwork={rainwork}
      navigation={navigation}
    />
  );
};

export default MapDetailsScreen;
