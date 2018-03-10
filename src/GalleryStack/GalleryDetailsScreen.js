import React from 'react';
import DetailsContent from '../DetailsView/DetailsContent';

const GalleryDetailsScreen = ({ navigation }) => {
  const rainwork = navigation.state.params.rainwork;
  return <DetailsContent navigation={navigation} rainwork={rainwork} includeReports={false}/>;
};

export default GalleryDetailsScreen;