import React from 'react';
import DetailsContent from '../DetailsView/DetailsContent';

const SubmissionDetailsScreen = ({ navigation }) => {
  const rainwork = navigation.state.params.rainwork;
  return <DetailsContent
    navigation={navigation}
    rainwork={rainwork}
    includeOpenInMaps
    includeFindOnMap={rainwork['approval_status'] === 'accepted'}
  />;
};

export default SubmissionDetailsScreen;