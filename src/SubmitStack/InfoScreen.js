import { Button, Container, Content, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, TextInput } from 'react-native';
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
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rainwork Title</Text>
              <TextInput
                ref={c => this._nameInput = c}
                style={styles.textInput}
                returnKeyType={'next'}
                value={this.props.name}
                onChangeText={this.props.setName}
                onSubmitEditing={() => this._creatorInput.focus()}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Creator (optional)</Text>
              <TextInput
                ref={c => this._creatorInput = c}
                style={styles.textInput}
                returnKeyType={'next'}
                value={this.props.creatorName}
                onChangeText={this.props.setCreatorName}
                onSubmitEditing={() => this._descriptionInput.focus()}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description (optional)</Text>
              <TextInput
                ref={c => this._descriptionInput = c}
                style={[styles.textInput, styles.multiline]}
                autogrow
                multiline
                blurOnSubmit
                value={this.props.description}
                returnKeyType={this.canSubmit() ? 'send' : undefined}
                onChangeText={this.props.setDescription}
                onSubmitEditing={() => this.canSubmit() && this.submit()}
              />
            </View>
          </View>
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

const styles = StyleSheet.create({
  form: {
    padding: 12,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '200'
  },
  textInput: {
    fontSize: 20,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: '#BBB'
  },
  multiline: {},
});

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