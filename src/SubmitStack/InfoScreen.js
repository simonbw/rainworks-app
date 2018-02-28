import { Form, Input, Item, Label, View } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView } from 'react-native';
import PhotoSelector from './PhotoSelector';
import { RainworkInfoConsumer } from './RainworkInfoContext';
import SubmitButton from './SubmitButton';

const UnconnectedInfoScreen = (props) => (
  <View style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1 }}>
      <PhotoSelector setImageUri={props.setImageUri} imageUri={props.imageUri}/>
      <Form style={{ flex: 1 }}>
        <Item stackedLabel>
          <Label>Rainwork Name</Label>
          <Input value={props.name} onChangeText={props.setName}/>
        </Item>
        <Item stackedLabel>
          <Label>Creator's Name</Label>
          <Input value={props.creatorName} onChangeText={props.setCreatorName}/>
        </Item>
        <Item stackedLabel>
          <Label>Your Email</Label>
          <Input value={props.creatorEmail} onChangeText={props.setCreatorEmail}/>
        </Item>
        <Item stackedLabel>
          <Label>Rainwork Description</Label>
          <Input multiline style={{ minHeight: 40 }} value={props.description} onChangeText={props.setDescription}/>
        </Item>
      </Form>
    </ScrollView>
    <SubmitButton disabled={!(props.imageUri && props.name)}/>
  </View>
);

UnconnectedInfoScreen.propTypes = {
  creatorEmail: PropTypes.string.isRequired,
  creatorName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUri: PropTypes.string,
  name: PropTypes.string.isRequired,
  setCreatorEmail: PropTypes.func.isRequired,
  setCreatorName: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setImageUri: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
};

const InfoScreen = () => (
  <RainworkInfoConsumer>
    {(props) => (
      <UnconnectedInfoScreen {...props}/>
    )}
  </RainworkInfoConsumer>
);

InfoScreen.navigationOptions = {
  title: 'Info'
};

export default InfoScreen;