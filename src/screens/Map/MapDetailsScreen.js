import React from "react";
import DetailsContent from "../../components/DetailsView/DetailsContent";

const MapDetailsScreen = ({ route, navigation }) => {
  const rainwork = route.params.rainwork;
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
