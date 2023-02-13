import { Button, Text, View } from "native-base";
import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import {
  Platform,
  ProgressBarAndroid,
  ProgressViewIOS,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GRAY, WHITE } from "../../constants/Colors";
import { SUBMISSIONS_SCREEN } from "../../constants/ScreenNames";
import {
  CreatorInput,
  DescriptionInput,
  InstallationDateInput,
  TitleInput,
  EmailInput,
} from "./InfoScreenForm";
import PhotoSelector from "./PhotoSelector";
import { SubmissionConsumer } from "./SubmissionContext";

const UnconnectedInfoScreen = (props) => {
  const _titleInput = useRef();
  const photoSelectorRef = useRef();

  const canSubmit = () => {
    return Boolean(!props.submitting && props.imageUri && props.name);
  };

  const submit = async () => {
    const success = await props.submit();
    if (success) {
      props.navigation.navigate(SUBMISSIONS_SCREEN);
    }
  };

  // componentDidMount() {
  //   // if (!props.imageUri) {
  //   //   _photoSelector.openPhotoSelect();
  //   // }
  // }

  useEffect(() => {
    photoSelectorRef.current?.show();
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View>
        <PhotoSelector
          ref={photoSelectorRef}
          imageUri={props.imageUri}
          setImageUri={(imageUri) => {
            props.setImageUri(imageUri);
            // if (!props.name) {
            //   _titleInput.focus();
            // }
          }}
        />
        <View style={styles.form}>
          <TitleInput
          // inputRef={(c) => (_titleInput = c)}
          />
          <InstallationDateInput />
          <CreatorInput />
          <EmailInput />
          <DescriptionInput />
        </View>
        <View style={{ height: 60 }} />

        {props.submitting ? (
          Platform.select({
            android: (
              <ProgressBarAndroid
                progress={props.uploadProgress}
                style={styles.progressViewAndroid}
              />
            ),
            ios: (
              <ProgressViewIOS
                progress={props.uploadProgress}
                style={styles.progressViewIOS}
              />
            ),
          })
        ) : (
          <Button
            style={[
              styles.submitButton,
              !canSubmit() ? { backgroundColor: GRAY } : {},
            ]}
            onPress={submit}
            isDisabled={!canSubmit()}
          >
            <Text style={{ color: WHITE }}>Submit</Text>
          </Button>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

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
});

const InfoScreen = ({ navigation }) => (
  <SubmissionConsumer>
    {(props) => <UnconnectedInfoScreen {...props} navigation={navigation} />}
  </SubmissionConsumer>
);

InfoScreen.navigationOptions = {
  title: "Info",
};

export default InfoScreen;
