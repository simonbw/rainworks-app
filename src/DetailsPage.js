import moment from 'moment';
import { Body, Button, Card, CardItem, H1, Right, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

const CARD_MARGIN = 12;

const DetailsPage = (props) => {
  const rainwork = props.rainwork;
  const createdDate = moment(rainwork.created_at)
    .format('MMM DD, YYYY');
  
  const source = rainwork.image_url ?
    { uri: rainwork.image_url }
    : require('../rainwork_placeholder.png');
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardItem header>
          <Body>
          </Body>
          <Right>
            <Button onPress={props.onClose}>
              <Text>Close</Text>
            </Button>
          </Right>
        </CardItem>
        <ScrollView>
          <CardItem cardBody>
            <Image
              style={{
                width: null,
                height: 240,
                flex: 1,
              }}
              resizeMode={'cover'}
              source={source}
            />
          </CardItem>
          <CardItem>
            <View>
              <H1>{rainwork.name}</H1>
              <Text>
                Created by {rainwork.creator_name} on {createdDate}
              </Text>
            </View>
          </CardItem>
          <CardItem>
            <View>
              <Text>{rainwork.description}</Text>
            </View>
          </CardItem>
        </ScrollView>
      </Card>
    </View>
  );
};

DetailsPage.propTypes = {
  rainwork: PropTypes.shape({
    name: PropTypes.string.isRequired,
    creator_name: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'flex-start',
    padding: CARD_MARGIN
  },
  card: {},
  image: {
    // flex: 1,
  }
});

export default DetailsPage;