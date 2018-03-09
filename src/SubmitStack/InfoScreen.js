import { Button, Container, Content, Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Platform, ProgressBarAndroid, ProgressViewIOS, StyleSheet } from 'react-native';
import { SUBMISSIONS_SCREEN } from '../MainNavigator';
import { CreatorInput, DescriptionInput, InstallationDateInput, TitleInput } from './InfoScreenForm';
import PhotoSelector from './PhotoSelector';
import { SubmissionConsumer } from './SubmissionContext';

class UnconnectedInfoScreen extends Component {
  static propTypes = {
    imageUri: PropTypes.string,
    name: PropTypes.string.isRequired,
    setImageUri: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    uploadProgress: PropTypes.number.isRequired,
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
  
  componentDidMount() {
    if (!this.props.imageUri) {
      this._photoSelector.openPhotoSelect();
    }
  }
  
  render() {
    return (
      <Container>
        <Content style={{ flex: 1 }} behavior="padding">
          <PhotoSelector
            ref={(c) => this._photoSelector = c}
            imageUri={this.props.imageUri}
            setImageUri={(imageUri) => {
              this.props.setImageUri(imageUri);
              if (!this.props.name) {
                this._titleInput.focus();
              }
            }}
          />
          <View style={styles.form}>
            <TitleInput inputRef={c => this._titleInput = c}/>
            <InstallationDateInput/>
            <CreatorInput/>
            <DescriptionInput/>
          </View>
          <View style={{ height: 60 }}/>
        </Content>
        
        {this.props.submitting ?
          Platform.select({
            'android': (
              <ProgressBarAndroid progress={this.props.uploadProgress} style={styles.progressViewAndroid}/>
            ),
            'ios': (
              <ProgressViewIOS progress={this.props.uploadProgress} style={styles.progressViewIOS}/>
            ),
          }) : (
            <Button style={styles.submitButton} onPress={this.submit} disabled={!this.canSubmit()}>
              <Text>Submit</Text>
            </Button>
          )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 12,
  },
  submitButton: { position: 'absolute', bottom: 12, right: 12 },
  progressViewAndroid: {},
  progressViewIOS: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
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