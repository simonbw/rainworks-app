import { Button, Container, Content, Form, Input, Item, Label, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { SUBMISSIONS_SCREEN } from '../MainNavigator';
import PhotoSelector from './PhotoSelector';
import { SubmissionConsumer } from './SubmissionContext';

class UnconnectedInfoScreen extends Component {
  static propTypes = {
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
    submit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
  };
  
  canSubmit() {
    return Boolean(!this.props.submitting && this.props.imageUri && this.props.name);
  }
  
  submit = async () => {
    const success = await this.props.submit();
    if (success) {
      this.props.navigation.navigate(SUBMISSIONS_SCREEN);
    }
  };
  
  render() {
    return (
      <Container>
        <Content style={{ flex: 1 }} behavior="padding">
          <PhotoSelector
            imageUri={this.props.imageUri}
            setImageUri={(imageUri) => {
              this.props.setImageUri(imageUri);
              if (!this.props.name) {
                this._nameInput.focus();
              }
            }}
          />
          <Form style={{ flex: 1 }}>
            <Item stackedLabel>
              <Label>Rainwork Title</Label>
              <Input
                ref={c => {
                  this._nameInput = c && c._root;
                }}
                returnKeyType={'next'}
                value={this.props.name}
                onChangeText={this.props.setName}
                onSubmitEditing={() => this._creatorInput.focus()}
              />
            </Item>
            <Item stackedLabel>
              <Label>Creator (optional)</Label>
              <Input
                ref={c => {
                  this._creatorInput = c && c._root;
                }}
                returnKeyType={'next'}
                value={this.props.creatorName}
                onChangeText={this.props.setCreatorName}
                onSubmitEditing={() => this._descriptionInput.focus()}
              />
            </Item>
            <Item bordered stackedLabel>
              <Label>Description (optional)</Label>
              <Input
                ref={c => {
                  this._descriptionInput = c && c._root;
                }}
                autogrow
                submitOnBlur
                value={this.props.description}
                returnKeyType={this.canSubmit() ? 'send' : undefined}
                maxHeight={200}
                onChangeText={this.props.setDescription}
                onSubmitEditing={() => this.canSubmit() && this.submit()}
              />
            </Item>
          </Form>
          <View style={{ height: 60 }}/>
        </Content>
        
        <View style={{ position: 'absolute', bottom: 12, right: 12 }}>
          {this.props.submitting ? (
            <ActivityIndicator size={'large'}/>
          ) : (
            <Button onPress={this.submit} disabled={!this.canSubmit()}>
              <Text>Submit</Text>
            </Button>
          )}
        </View>
      </Container>
    );
  }
}

const InfoScreen = ({ navigation }) => (
  <SubmissionConsumer>
    {(props) => (
      <UnconnectedInfoScreen {...props} navigation={navigation}/>
    )}
  </SubmissionConsumer>
);

InfoScreen.navigationOptions = {
  title: 'Info'
};

export default InfoScreen;