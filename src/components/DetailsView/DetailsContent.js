import moment from "moment/moment";
import { Button, View } from "native-base";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import {
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  Alert,
  ProgressBarAndroid,
  ProgressViewIOS,
} from "react-native";
import Autolink from "react-native-autolink";
import openMap from "react-native-open-maps";
import { WHITE, RAINWORKS_BLUE, REJECTED_COLOR } from "../../constants/Colors";
import Divider from "../Divider";
import Link from "../Link";
import { MAP_SCREEN, FIND_MAP_SCREEN } from "../../screens/Map/ScreenNames";
import { EDIT_INFO_SCREEN } from "../../screens/Submissions/ScreenNames";
import { COMMON_DATE_FORMAT } from "../../../utils/util";
import {
  rainworkToCoords,
  androidRainworkToCoords,
} from "../../../utils/mapUtils";
import ApprovalStatus from "./ApprovalStatus";
import DetailsImage from "./DetailsImage";
import ReportButtons from "./ReportButtons";
import ReportsText from "./ReportsText";
import { SubmissionConsumer } from "../../screens/Submit/SubmissionContext";
import { SUBMISSIONS_LIST_SCREEN } from "../../screens/Submissions/ScreenNames";

const DetailsContent = (props) => {
  const {
    navigation,
    rainwork,
    includeReports = false,
    includeApprovalStatus = false,
    includeFindOnMap = false,
    includeOpenInMaps = false,
    submission = false,
  } = props;

  return (
    <ScrollView style={{ backgroundColor: WHITE }}>
      <DetailsImage imageUrl={rainwork["image_url"]} />
      {includeApprovalStatus && (
        <ApprovalStatus
          status={rainwork["approval_status"]}
          rejectionReason={rainwork["rejection_reason"]}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{rainwork["name"]}</Text>
        <Text style={styles.subtitle}>
          Created
          {rainwork["creator_name"] && (
            <Fragment>
              {" "}
              by <Text style={styles.creator}>{rainwork["creator_name"]}</Text>
            </Fragment>
          )}{" "}
          on{" "}
          <Text style={styles.createdDate}>
            {moment(rainwork["installation_date"]).format(COMMON_DATE_FORMAT)}
          </Text>
        </Text>

        {rainwork["description"] ? (
          <Fragment>
            <Divider />
            <Text style={styles.description}>
              <Autolink
                text={rainwork["description"]}
                email
                renderLink={(text, match) => {
                  return (
                    <Link url={match.email ? "" : match.getUrl()}>{text}</Link>
                  );
                }}
              />
            </Text>
          </Fragment>
        ) : null}

        {includeReports && (
          <Fragment>
            <Divider />
            <View style={styles.foundItSection}>
              <ReportsText rainwork={rainwork} />
              <ReportButtons rainwork={rainwork} navigation={navigation} />
            </View>
          </Fragment>
        )}

        {(includeFindOnMap || includeOpenInMaps) && (
          <Fragment>
            <Divider />
            <View style={styles.mapButtonsRow}>
              {includeFindOnMap ? (
                <Button
                  variant="outline"
                  style={styles.primaryBorderColor}
                  onPress={() =>
                    props.navigation.navigate(MAP_SCREEN, {
                      selectedRainwork: rainwork,
                    })
                  }
                >
                  <Text style={styles.primaryColor}>Find on Map</Text>
                </Button>
              ) : (
                <View />
              )}

              {includeFindOnMap && includeOpenInMaps ? (
                <Button
                  variant="outline"
                  style={styles.primaryBorderColor}
                  onPress={() => {
                    if (Platform.OS === "android") {
                      openMap(androidRainworkToCoords(rainwork));
                    } else {
                      openMap(rainworkToCoords(rainwork));
                    }
                  }}
                >
                  <Text style={styles.primaryColor}>Open in Maps</Text>
                </Button>
              ) : (
                <View />
              )}
            </View>
          </Fragment>
        )}

        {submission && includeOpenInMaps && !includeFindOnMap ? (
          <View style={styles.mapButtonsRow}>
            <Button
              variant="outline"
              style={styles.primaryBorderColor}
              onPress={() => {
                if (Platform.OS === "android") {
                  openMap(androidRainworkToCoords(rainwork));
                } else {
                  openMap(rainworkToCoords(rainwork));
                }
              }}
            >
              <Text style={styles.primaryColor}>Open in Maps</Text>
            </Button>
          </View>
        ) : (
          <View />
        )}

        {submission && (
          <Fragment>
            <Divider />
            <View style={styles.mapButtonsRow}>
              <SubmissionConsumer>
                {({ markSubmissionFade }) => {
                  const markSubmission = async (id) => {
                    const success = await markSubmissionFade(id);
                    if (success) {
                      setTimeout(() => {
                        props.navigation.navigate(MAP_SCREEN);
                      }, 2000);
                    }
                  };
                  return (
                    <Button
                      variant="outline"
                      style={styles.blueBorderColor}
                      onPress={() =>
                        Alert.alert(
                          "Rainworks",
                          "Are you sure? \nThis button is for when your rainwork is faded to the point where it is difficult to see. It will be removed from the map but will remain in the Rainwork Gallery.",
                          [
                            {
                              text: "No",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                            {
                              text: "Yes",
                              onPress: () => markSubmission(rainwork.id),
                            },
                          ]
                        )
                      }
                    >
                      <Text style={styles.blueColor}>Mark As Faded</Text>
                    </Button>
                  );
                }}
              </SubmissionConsumer>

              <Button
                variant="outline"
                style={styles.blueBorderColor}
                onPress={() =>
                  props.navigation.navigate(EDIT_INFO_SCREEN, {
                    rainwork,
                  })
                }
              >
                <Text style={styles.blueColor}>Edit Rainwork</Text>
              </Button>
            </View>
            <View style={styles.mapButtonsRow}>
              <SubmissionConsumer>
                {({ deleteSubmission }) => {
                  const deleteRainwork = async (id) => {
                    const resetAction = navigation.reset({
                      index: 0,
                      routes: [{ name: SUBMISSIONS_LIST_SCREEN }],
                    });
                    const success = await deleteSubmission(id);
                    if (success) {
                      props.navigation.dispatch(resetAction);
                    }
                  };

                  return (
                    <Button
                      variant="outline"
                      style={styles.dangerBorderColor}
                      onPress={() =>
                        Alert.alert(
                          "Rainworks",
                          "Are you sure? \nThis cannot be undone.",
                          [
                            {
                              text: "No",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                            {
                              text: "Yes",
                              onPress: () => deleteRainwork(rainwork.id),
                            },
                          ]
                        )
                      }
                    >
                      <Text style={styles.dangerColor}>Delete Rainwork</Text>
                    </Button>
                  );
                }}
              </SubmissionConsumer>
            </View>
            <View style={styles.mapButtonsRow}>
              <SubmissionConsumer>
                {({ submitting, uploadProgress }) => {
                  return (
                    <>
                      {submitting &&
                        Platform.select({
                          android: (
                            <ProgressBarAndroid
                              progress={uploadProgress}
                              style={styles.progressViewAndroid}
                            />
                          ),
                          ios: (
                            <ProgressViewIOS
                              progress={uploadProgress}
                              style={styles.progressViewIOS}
                            />
                          ),
                        })}
                    </>
                  );
                }}
              </SubmissionConsumer>
            </View>
          </Fragment>
        )}
      </View>
    </ScrollView>
  );
};

DetailsContent.propTypes = {
  includeApprovalStatus: PropTypes.bool,
  includeFindOnMap: PropTypes.bool,
  includeOpenInMaps: PropTypes.bool,
  includeReports: PropTypes.bool,
  navigation: PropTypes.object,
  rainwork: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  uploadProgress: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    paddingBottom: 6,
  },
  subtitle: {
    paddingBottom: 12,
  },
  creator: {
    fontStyle: "italic",
  },
  createdDate: {},
  description: {
    paddingVertical: 12,
  },
  foundItSection: {
    paddingVertical: 12,
  },
  mapButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  primaryBorderColor: { borderColor: RAINWORKS_BLUE },
  primaryColor: { color: RAINWORKS_BLUE },
  dangerBorderColor: { borderColor: REJECTED_COLOR },
  dangerColor: { color: REJECTED_COLOR },
  blueBorderColor: { borderColor: "#1a91ff" },
  blueColor: { color: "#1a91ff" },
  progressViewAndroid: {},
  progressViewIOS: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },
});

export default DetailsContent;
