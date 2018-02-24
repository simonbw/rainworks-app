import { Body, Button, Card, CardItem, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';

const DetailsPage = (props) => (
  <View style={styles.container}>
    <Card style={styles.card}>
      <CardItem>
        <Body>
          <Button onPress={props.onClose}>
            <Text>Close</Text>
          </Button>
          <Text>
            {JSON.stringify(props.rainwork, null, 2)}
          </Text>
        </Body>
      </CardItem>
    </Card>
  </View>
);

DetailsPage.propTypes = {
  rainwork: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10
  },
  card: {
    // flex: 1,
  }
});

export default DetailsPage;