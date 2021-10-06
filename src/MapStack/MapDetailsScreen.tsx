import React from "react";
import DetailsContent from "../DetailsView/DetailsContent";
import { NavigationScreenProp } from "react-navigation";
import { Rainwork } from "../api/rainworksApi";

interface Props {
  navigation: NavigationScreenProp<{}, { rainwork: Rainwork }>;
}

export default function MapDetailsScreen({ navigation }: Props) {
  const rainwork = navigation.getParam("rainwork");
  return (
    <DetailsContent
      includeReports
      includeOpenInMaps
      rainwork={rainwork}
      navigation={navigation}
    />
  );
}
