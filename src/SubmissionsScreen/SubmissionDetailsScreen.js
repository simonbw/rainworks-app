import React from "react";
import DetailsContent from "../DetailsView/DetailsContent";

const SubmissionDetailsScreen = ({ navigation }) => {
  const rainwork = navigation.state.params.rainwork;
  return (
    <DetailsContent
      navigation={navigation}
      rainwork={rainwork}
      includeFindOnMap={rainwork["approval_status"] === "accepted"}
      includeOpenInMaps
      includeApprovalStatus
    />
  );
};

export default SubmissionDetailsScreen;
