import React from "react";
import { NavigationScreenProp } from "react-navigation";
import { Rainwork } from "../api/rainworksApi";
import DetailsContent from "../DetailsView/DetailsContent";

interface Props {
  navigation: NavigationScreenProp<{}, { rainwork: Rainwork }>;
}

export default function SubmissionDetailsScreen({ navigation }: Props) {
  const rainwork = navigation.getParam("rainwork");
  return (
    <DetailsContent
      navigation={navigation}
      rainwork={rainwork}
      includeFindOnMap={rainwork["approval_status"] === "accepted"}
      includeOpenInMaps
      includeApprovalStatus
    />
  );
}
