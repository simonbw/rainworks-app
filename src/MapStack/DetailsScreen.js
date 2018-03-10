import React from 'react';
import DetailsContent from '../DetailsView/DetailsContent';

const DetailsScreen = ({ navigation }) => {
  const rainwork = navigation.state.params.rainwork;
  return <DetailsContent rainwork={rainwork} navigation={navigation} includeReports={true}/>;
};

export default DetailsScreen;