import React from "react";
import DetailsContent from "../../components/DetailsView/DetailsContent";

const GalleryDetailsScreen = ({ route, navigation }) => {
  const { rainwork } = route.params;
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
