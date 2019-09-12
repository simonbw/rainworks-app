import { Button, Container, Content, Text, View } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { ACTION_COLOR, DARK_GRAY, GRAY } from "../constants/Colors";
import { ReportsConsumer } from "../contexts/ReportsContext";
import PhotoSelector from "../SubmitStack/PhotoSelector";

class ReportScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    rainworkId: PropTypes.number.isRequired,
    reportType: PropTypes.string.isRequired,
    submitReport: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      imageUri: null,
      description: ""
    };
  }

  submit = async () => {
    await this.props.submitReport(
      this.props.rainworkId,
      this.props.reportType,
      this.state.imageUri,
      this.state.description
    );
    this.props.navigation.goBack();
  };

  render() {
    const reportType = this.props.reportType;
    return (
      <Container>
        <Content style={{ flex: 1 }} behavior="padding">
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
              <PhotoSelector
                setImageUri={imageUri => this.setState({ imageUri })}
                imageUri={this.state.imageUri}
              />
              {!this.state.imageUri && (
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
                  autogrow
                  blurOnSubmit
                  disabled={this.props.submitting}
                  multiline
                  onChangeText={description => this.setState({ description })}
                  style={[styles.textInput, styles.multiline]}
                  value={this.state.description}
                />
              </View>
            )}
            {this.props.submitting ? (
              <ActivityIndicator size="large" />
            ) : (
              <Button danger block onPress={this.submit}>
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
}

const styles = StyleSheet.create({
  container: {
    padding: 16
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

export default ({ navigation }) => (
  <ReportsConsumer>
    {({ submitReport, submitting }) => (
      <ReportScreen
        submitting={submitting}
        submitReport={submitReport}
        navigation={navigation}
        rainworkId={navigation.state.params.rainworkId}
        reportType={navigation.state.params.reportType}
      />
    )}
  </ReportsConsumer>
);
