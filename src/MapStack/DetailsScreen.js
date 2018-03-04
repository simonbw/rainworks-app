import moment from 'moment/moment';
import { H1, Text } from 'native-base';
import React from 'react';
import { Image, ScrollView } from 'react-native';
import { FoundItButton } from './ReportButtons';

const DetailsScreen = ({ navigation }) => {
  const rainwork = navigation.state.params.rainwork;
  const createdDate = moment(rainwork['created_at']).format('MMM DD, YYYY');
  const imageSource = rainwork['image_url'] ?
    { uri: rainwork['image_url'] }
    : require('../../rainwork_placeholder.png');
  return (
    <ScrollView>
      <Image
        style={{
          width: null,
          height: 240,
          flex: 1,
        }}
        resizeMode={'cover'}
        source={imageSource}
      />
      <H1>{rainwork['name']}</H1>
      <Text>Created by {rainwork['creator_name']} on {createdDate}</Text>
      <Text>
        {rainwork['found_it_count']}
        {rainwork['found_it_count'] === 1 ? ' person has ' : ' people have '}
        found this rainwork before
      </Text>
      <Text>{rainwork['description']}</Text>
      
      <FoundItButton rainworkId={rainwork['id']}/>
    </ScrollView>
  );
};

export default DetailsScreen;