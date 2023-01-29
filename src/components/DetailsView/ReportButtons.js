import {
  Actionsheet,
  Button,
  Text,
  View,
  useDisclose,
  Heading,
} from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
// import { withNavigation } from "react-navigation";
import { ReportsConsumer } from "../../contexts/ReportsContext";
import LocationRestricted from "../../../utils/LocationRestricted";
import { REPORT_SCREEN } from "../../screens/Map/ScreenNames";
import {
  ACCEPTED_COLOR,
  DARK_GRAY,
  RAINWORKS_BLUE,
  REJECTED_COLOR,
  TRANSPARENT,
  WHITE,
} from "../../constants/Colors";

const MISSING_TEXT = "It's Not Here";
const FADED_TEXT = "It's Really Faded";
const INAPPROPRIATE_TEXT = "It's Inappropriate";
const CANCEL_TEXT = "Cancel";

const ReportButtons = ({ navigation, rainwork }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleSelectReport = async (
    hasMissing,
    hasFaded,
    hasInappropriate,
    selection,
    submitReport
  ) => {
    const reportType = await pickReport(
      hasMissing,
      hasFaded,
      hasInappropriate,
      selection,
      submitReport
    );

    if (reportType === "missing") {
      await submitReport(rainwork["id"], reportType);
    } else if (reportType === "faded" || reportType === "inappropriate") {
      navigation.navigate(REPORT_SCREEN, {
        rainworkId: rainwork["id"],
        reportType: reportType,
      });
    }
    onClose();
  };

  const pickReport = async (
    hasMissing,
    hasFaded,
    hasInappropriate,
    selection
  ) => {
    // console.log("wnejkm", hasMissing, hasFaded, hasInappropriate, selection);
    // const options = [];
    // if (!hasMissing) {
    //   options.push(MISSING_TEXT);
    // }
    // if (!hasFaded) {
    //   options.push(FADED_TEXT);
    // }
    // if (!hasInappropriate) {
    //   options.push(INAPPROPRIATE_TEXT);
    // }
    // options.push(CANCEL_TEXT);

    // const selection = await new Promise((resolve) => {
    //   ActionSheet.show(
    //     {
    //       title: "Report Reason",
    //       options: options,
    //       cancelButtonIndex: options.indexOf(CANCEL_TEXT),
    //     },
    //     resolve
    //   );
    // });
    if (selection === MISSING_TEXT) {
      return "missing";
    } else if (selection === FADED_TEXT) {
      return "faded";
    } else if (selection === INAPPROPRIATE_TEXT) {
      return "inappropriate";
    } else {
      return null;
    }
  };

  return (
    <LocationRestricted
      renderInside={
        <ReportsConsumer>
          {({ getReport, hasReport, submitReport, submitting }) => {
            if (submitting) {
              return <ActivityIndicator size={"large"} color={DARK_GRAY} />;
            }

            const hasFoundIt = hasReport(rainwork["id"], "found_it");
            const hasMissing = hasReport(rainwork["id"], "missing");
            const hasFaded = hasReport(rainwork["id"], "faded");
            const hasInappropriate = hasReport(rainwork["id"], "inappropriate");
            return (
              <View>
                {!hasFoundIt && !hasMissing && (
                  <Button
                    // colorScheme='tertiary'
                    style={{ backgroundColor: "#22c55e" }}
                    onPress={() => submitReport(rainwork["id"], "found_it")}
                  >
                    <Text style={{ color: WHITE }}>I Found It!</Text>
                  </Button>
                )}
                {(!hasMissing || !hasFaded || !hasInappropriate) && (
                  <>
                    <Button style={styles.reportButton} onPress={onOpen}>
                      <Text style={{ color: "#ef4444" }}>Report Rainwork</Text>
                    </Button>

                    <Actionsheet isOpen={isOpen} onClose={onClose}>
                      <Actionsheet.Content>
                        <Text>Report Reason</Text>
                        <Actionsheet.Item
                          style={styles.bgTransparent}
                          onPress={() =>
                            handleSelectReport(
                              hasMissing,
                              hasFaded,
                              hasInappropriate,
                              MISSING_TEXT,
                              submitReport
                            )
                          }
                        >
                          <Text style={styles.reportText}>{MISSING_TEXT}</Text>
                        </Actionsheet.Item>
                        <Actionsheet.Item
                          style={styles.bgTransparent}
                          onPress={() =>
                            handleSelectReport(
                              hasMissing,
                              hasFaded,
                              hasInappropriate,
                              FADED_TEXT
                            )
                          }
                        >
                          <Text style={styles.reportText}>{FADED_TEXT}</Text>
                        </Actionsheet.Item>
                        <Actionsheet.Item
                          style={styles.bgTransparent}
                          onPress={() =>
                            handleSelectReport(
                              hasMissing,
                              hasFaded,
                              hasInappropriate,
                              INAPPROPRIATE_TEXT
                            )
                          }
                        >
                          <Text style={styles.reportText}>
                            {INAPPROPRIATE_TEXT}
                          </Text>
                        </Actionsheet.Item>
                      </Actionsheet.Content>
                    </Actionsheet>
                  </>
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
  );
};

ReportButtons.propTypes = {
  rainwork: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  reportButton: {
    marginTop: 12,
    borderWidth: 0.5,
    borderColor: "#ef4444",
    backgroundColor: TRANSPARENT,
  },
  reportText: {
    color: "#006ee6",
    fontSize: 16,
  },
  bgTransparent: { backgroundColor: TRANSPARENT },
});

export default ReportButtons;
