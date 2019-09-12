import React from "react";
import DetailsContent from "../DetailsView/DetailsContent";

const GalleryDetailsScreen = ({ navigation }) => {
  const rainwork = navigation.state.params.rainwork;
  const isExpired = rainwork["approval_status"] === "expired";
  return (
    <DetailsContent
      navigation={navigation}
      rainwork={rainwork}
      includeReports={false}
      includeFindOnMap={!isExpired}
      includeOpenInMaps={!isExpired}
      includeApprovalStatus={isExpired}
    />
  );
};

export default GalleryDetailsScreen;
