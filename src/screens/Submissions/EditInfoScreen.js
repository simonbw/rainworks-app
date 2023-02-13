import { Button, Text, View } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SUBMISSIONS_LIST_SCREEN } from "./ScreenNames";
import {
  CreatorInput,
  DescriptionInput,
  InstallationDateInput,
  TitleInput,
  EmailInput,
} from "./EditInfoScreenForm";
import PhotoSelector from "../Submit/PhotoSelector";
import { SubmissionConsumer } from "../Submit/SubmissionContext";
import {
  EXPIRED_COLOR,
  GRAY,
  PENDING_COLOR,
  WHITE,
} from "../../constants/Colors";
// import { StackActions, NavigationActions } from "react-navigation";

class UnconnectedEditInfoScreen extends Component {
  static propTypes = {
    imageUri: PropTypes.string,
    name: PropTypes.string.isRequired,
    setImageUri: PropTypes.func.isRequired,
    editRainwork: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    uploadProgress: PropTypes.number.isRequired,
    navigation: PropTypes.object.isRequired,
    rainwork: PropTypes.object,
  };

  canSubmit() {
    return Boolean(
      !this.props.submitting && this.props.imageUri && this.props.name
    );
  }

  editRainwork = async () => {
    const resetAction = this.props.navigation.reset({
      index: 0,
      routes: [{ name: SUBMISSIONS_LIST_SCREEN }],
    });
    const success = await this.props.editRainwork(this.props.rainwork.id);
    if (success) {
      this.props.navigation.dispatch(resetAction);
    }
  };

  componentDidMount() {
    if (this.props.rainwork) {
      this.props.setImageUri(this.props.rainwork.image_url);
      this.props.setName(this.props.rainwork.name);
      this.props.setInstallationDate(new Date(this.props.rainwork.created_at));
      this.props.setCreatorName(this.props.rainwork.creator_name);
      this.props.setCreatorEmail(this.props.rainwork.creator_email);
      this.props.setDescription(this.props.rainwork.description);
      this.props.setLocation(this.props.rainwork.lat, this.props.rainwork.lng);
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <View>
          <View>
            <PhotoSelector
              ref={(c) => (this._photoSelector = c)}
              imageUri={this.props.imageUri}
              setImageUri={(imageUri) => {
                this.props.setImageUri(imageUri);
                if (!this.props.name) {
                  this._titleInput.focus();
                }
              }}
            />
            <TouchableOpacity
              style={styles.container}
              onPress={() => this._photoSelector.openPhotoSelect()}
            >
              <Text style={styles.status}>Change photo?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <TitleInput inputRef={(c) => (this._titleInput = c)} />
            <InstallationDateInput />
            <CreatorInput />
            <EmailInput />
            <DescriptionInput />
          </View>
          <View style={{ height: 60 }} />

          {this.props.submitting ? (
            Platform.select({
              android: (
                <ProgressBarAndroid
                  progress={this.props.uploadProgress}
                  style={styles.progressViewAndroid}
                />
              ),
              ios: (
                <ProgressViewIOS
                  progress={this.props.uploadProgress}
                  style={styles.progressViewIOS}
                />
              ),
            })
          ) : (
            <Button
              style={[
                styles.submitButton,
                !this.canSubmit() ? { backgroundColor: GRAY } : {},
              ]}
              onPress={this.editRainwork}
              isDisabled={!this.canSubmit()}
            >
              <Text style={{ color: WHITE }}>Submit</Text>
            </Button>
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
  submitButton: { position: "absolute", bottom: 12, right: 12 },
  progressViewAndroid: {},
  progressViewIOS: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },
  container: {
    top: -120,
    padding: 12,
    backgroundColor: EXPIRED_COLOR,
  },
  status: {
    color: WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
});

const EditInfoScreen = ({ navigation, route }) => {
  const { rainwork } = route.params;

  return (
    <SubmissionConsumer>
      {(props) => (
        <UnconnectedEditInfoScreen
          {...props}
          navigation={navigation}
          rainwork={rainwork}
        />
      )}
    </SubmissionConsumer>
  );
};

EditInfoScreen.navigationOptions = {
  title: "Edit Info",
};

export default EditInfoScreen;
