import React from "react";
import DetailsContent from "../../components/DetailsView/DetailsContent";

const SubmissionDetailsScreen = ({ navigation, route }) => {
  const rainwork = route.params.rainwork;
  return (
    <DetailsContent
      navigation={navigation}
      rainwork={rainwork}
      includeFindOnMap={rainwork["approval_status"] === "accepted"}
      includeOpenInMaps
      includeApprovalStatus
      submission={true}
    />
  );
};

export default SubmissionDetailsScreen;
