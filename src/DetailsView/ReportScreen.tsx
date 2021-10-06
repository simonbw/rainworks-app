import { Button, Container, Content, Text, View } from "native-base";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { DARK_GRAY, GRAY } from "../constants/Colors";
import { ReportType, useReportsContext } from "../contexts/ReportsContext";
import PhotoSelector from "../SubmitStack/PhotoSelector";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<
    {},
    {
      rainworkId: string;
      reportType: ReportType;
    }
  >;
}

export default function ReportsScreen({ navigation }: Props) {
  const [imageUri, setImageUri] = useState();
  const [description, setDescription] = useState("");
  const { submitReport, submitting } = useReportsContext();

  const rainworkId = navigation.getParam("rainworkId");
  const reportType = navigation.getParam("reportType");

  async function submit() {
    await submitReport(rainworkId, reportType, imageUri, description);
    navigation.goBack();
  }

  return (
    <Container>
      <Content style={styles.content}>
        <View style={styles.container}>
          {reportType === "inappropriate" && (
            <View style={styles.inputGroup}>
              <Text>
                Please help us out by taking a picture of the inappropriate
                rainwork or explain the reason for reporting it.
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
            <PhotoSelector setImageUri={setImageUri} imageUri={imageUri} />
            {!imageUri && (
              <Text style={styles.disclaimer}>
                A photo is not required to submit this report, but it's
                extremely helpful. Thank you!
              </Text>
            )}
          </View>
          {reportType === "inappropriate" && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Reason for reporting</Text>
              <TextInput
                blurOnSubmit
                editable={!submitting}
                multiline
                onChangeText={setDescription}
                style={[styles.textInput, styles.multiline]}
                value={description}
              />
            </View>
          )}
          {submitting ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button danger block onPress={submit}>
              <Text>
                {reportType === "inappropriate" && "Report as Inappropriate"}
                {reportType === "faded" && "Report as Faded"}
              </Text>
            </Button>
          )}

          <View style={{ height: 60 }} />
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  content: {
    flex: 1
  },
  inputGroup: {
    marginBottom: 12
  },
  label: {
    fontSize: 14,
    fontWeight: "200"
  },
  textInput: {
    fontSize: 20,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: GRAY
  },
  multiline: {},
  datePicker: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: GRAY
  },
  disclaimer: {
    color: DARK_GRAY,
    fontStyle: "italic",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8
  }
});
