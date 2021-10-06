import React from "react";
import DetailsContent from "../DetailsView/DetailsContent";
import { NavigationScreenProp } from "react-navigation";
import { Rainwork } from "../api/rainworksApi";

interface Props {
  navigation: NavigationScreenProp<{}, { rainwork: Rainwork }>;
}

export default function GalleryDetailsScreen({ navigation }: Props) {
  const rainwork = navigation.getParam("rainwork");
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
}
