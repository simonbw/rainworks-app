import { Button, Container, Text, View } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { DARK_GRAY, GRAY, WHITE } from "../../constants/Colors";
import { ReportsConsumer } from "../../contexts/ReportsContext";
import PhotoSelector from "../../screens/Submit/PhotoSelector";

const ReportScreen = (props) => {
  const [imageUri, setImageUri] = useState();
  const [description, setDescription] = useState("");

  const reportType = props.reportType;

  const submit = async () => {
    await props.submitReport(
      props.rainworkId,
      props.reportType,
      imageUri,
      description
    );
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {reportType === "inappropriate" && (
        <View style={styles.inputGroup}>
          <Text>
            Please help us out by taking a picture of the inappropriate rainwork
            or explain the reason for reporting it.
          </Text>
        </View>
      )}
      {reportType === "faded" && (
        <View style={styles.inputGroup}>
          <Text>
            Please help us out by taking a photo of the faded rainwork.
          </Text>
        </View>
      )}
      <View style={styles.inputGroup}>
        <PhotoSelector
          setImageUri={(imageUri) => setImageUri(imageUri)}
          imageUri={imageUri}
        />
        {imageUri && (
          <Text style={styles.disclaimer}>
            A photo is not required to submit this report, but it's extremely
            helpful. Thank you!
          </Text>
        )}
      </View>
      {reportType === "inappropriate" && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Reason for reporting</Text>
          <TextInput
            autogrow
            blurOnSubmit
            disabled={props.submitting}
            multiline
            onChangeText={(description) => setDescription(description)}
            style={[styles.textInput, styles.multiline]}
            value={description}
          />
        </View>
      )}
      {props.submitting ? (
        <ActivityIndicator size="large" color={DARK_GRAY} />
      ) : (
        <Button
          style={{ backgroundColor: "#dc2626", opacity: 0.8 }}
          onPress={submit}
        >
          <Text style={{ color: WHITE }}>
            {reportType === "inappropriate" && "Report as Inappropriate"}
            {reportType === "faded" && "Report as Faded"}
          </Text>
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "200",
  },
  textInput: {
    fontSize: 20,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: GRAY,
  },
  multiline: {},
  datePicker: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: GRAY,
  },
  disclaimer: {
    color: DARK_GRAY,
    fontStyle: "italic",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
});

export default ({ navigation, route }) => {
  return (
    <ReportsConsumer>
      {({ submitReport, submitting }) => (
        <ReportScreen
          submitting={submitting}
          submitReport={submitReport}
          navigation={navigation}
          rainworkId={route.params.rainworkId}
          reportType={route.params.reportType}
        />
      )}
    </ReportsConsumer>
  );
};
