import React from 'react';
import DetailsContent from '../DetailsView/DetailsContent';

const SubmissionDetailsScreen = ({ navigation }) => {
  const rainwork = navigation.state.params.rainwork;
  return <DetailsContent rainwork={rainwork} includeReports={false}/>;
};

export default SubmissionDetailsScreen;