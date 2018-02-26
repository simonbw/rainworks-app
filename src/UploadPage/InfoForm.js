import { Body, CardItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const InfoForm = (props) => (
  <CardItem>
    <Body>
      <Text>Rainwork Name</Text>
      <TextInput
        style={styles.input}
        value={props.name}
        onChangeText={(value) => props.setName(value)}
      />
      
      <Text>Description</Text>
      <TextInput
        style={styles.input}
        multiline
        value={props.description}
        onChangeText={(value) => props.setDescription(value)}
      />
      
      <Text>Your Name</Text>
      <TextInput
        style={styles.input}
        value={props.creatorName}
        onChangeText={(value) => props.setCreatorName(value)}
      />
      
      <Text>Your Email</Text>
      <TextInput
        style={styles.input}
        value={props.creatorEmail}
        onChangeText={(value) => props.setCreatorEmail(value)}
      />
    </Body>
  </CardItem>
);

InfoForm.propTypes = {
  setCreatorEmail: PropTypes.func.isRequired,
  setCreatorName: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  creatorName: PropTypes.string,
  creatorEmail: PropTypes.string,
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
});

export default InfoForm;