import React from 'react';
import DetailsContent from '../DetailsView/DetailsContent';

const DetailsScreen = ({ navigation }) => {
  const rainwork = navigation.state.params.rainwork;
  return <DetailsContent rainwork={rainwork} includeReports={true}/>;
};

export default DetailsScreen;