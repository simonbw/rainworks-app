import { ActionSheet, Button, Text, View } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { ReportsConsumer } from "../contexts/ReportsContext";
import LocationRestricted from "../LocationRestricted";
import { REPORT_SCREEN } from "../MapStack/ScreenNames";

const MISSING_TEXT = "Its Not Here";
const FADED_TEXT = "Its Really Faded";
const INAPPROPRIATE_TEXT = "It's Inappropriate";
const CANCEL_TEXT = "Cancel";

const ReportButtons = withNavigation(({ navigation, rainwork }) => (
  <LocationRestricted
    renderInside={
      <ReportsConsumer>
        {({ getReport, hasReport, submitReport, submitting }) => {
          if (submitting) {
            return <ActivityIndicator size={"large"} />;
          }

          const hasFoundIt = hasReport(rainwork["id"], "found_it");
          const hasMissing = hasReport(rainwork["id"], "missing");
          const hasFaded = hasReport(rainwork["id"], "faded");
          const hasInappropriate = hasReport(rainwork["id"], "inappropriate");
          return (
            <View>
              {!hasFoundIt && !hasMissing && (
                <Button
                  block
                  success
                  style={styles.button}
                  onPress={() => submitReport(rainwork["id"], "found_it")}
                >
                  <Text>I Found It!</Text>
                </Button>
              )}
              {(!hasMissing || !hasFaded || !hasInappropriate) && (
                <Button
                  block
                  danger
                  bordered
                  style={styles.button}
                  onPress={async () => {
                    const reportType = await pickReport(
                      hasMissing,
                      hasFaded,
                      hasInappropriate
                    );
                    if (reportType === "missing") {
                      await submitReport(rainwork["id"], reportType);
                    } else if (
                      reportType === "faded" ||
                      reportType === "inappropriate"
                    ) {
                      navigation.navigate(REPORT_SCREEN, {
                        rainworkId: rainwork["id"],
                        reportType: reportType,
                      });
                    }
                  }}
                >
                  <Text>Report Rainwork</Text>
                </Button>
              )}
            </View>
          );
        }}
      </ReportsConsumer>
    }
    renderOutside={
      <ReportsConsumer>
        {({ hasReport }) =>
          hasReport(rainwork["id"], "found_it") ? null : (
            <Text>Get closer to this rainwork to mark it as found.</Text>
          )
        }
      </ReportsConsumer>
    }
    lat={rainwork["lat"]}
    lng={rainwork["lng"]}
    maximumDistance={1.0}
  />
));

const pickReport = async (
  hasMissing,
  hasFaded,
  hasInappropriate,
  submitReport
) => {
  const options = [];
  if (!hasMissing) {
    options.push(MISSING_TEXT);
  }
  if (!hasFaded) {
    options.push(FADED_TEXT);
  }
  if (!hasInappropriate) {
    options.push(INAPPROPRIATE_TEXT);
  }
  options.push(CANCEL_TEXT);

  const selection = await new Promise((resolve) => {
    ActionSheet.show(
      {
        title: "Report Reason",
        options: options,
        cancelButtonIndex: options.indexOf(CANCEL_TEXT),
      },
      resolve
    );
  });
  if (selection === options.indexOf(MISSING_TEXT)) {
    return "missing";
  } else if (selection === options.indexOf(FADED_TEXT)) {
    return "faded";
  } else if (selection === options.indexOf(INAPPROPRIATE_TEXT)) {
    return "inappropriate";
  } else {
    return null;
  }
};

ReportButtons.propTypes = {
  rainwork: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 12,
  },
});

export default ReportButtons;
