import moment from "moment/moment";
import { Button, Text, View } from "native-base";
import React, { Fragment } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Autolink from "react-native-autolink";
import openMap from "react-native-open-maps";
import { Rainwork } from "../api/rainworksApi";
import Divider from "../Common/Divider";
import Link from "../Common/Link";
import { WHITE } from "../constants/Colors";
import { MAP_SCREEN } from "../MapStack/ScreenNames";
import { rainworkToCoords } from "../utils/mapUtils";
import { COMMON_DATE_FORMAT } from "../utils/util";
import ApprovalStatusLabel from "./ApprovalStatus";
import DetailsImage from "./DetailsImage";
import ReportButtons from "./ReportButtons";
import ReportsText from "./ReportsText";
import { NavigationScreenProp } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<{}>;
  rainwork: Rainwork;
  includeApprovalStatus?: boolean;
  includeFindOnMap?: boolean;
  includeOpenInMaps?: boolean;
  includeReports?: boolean;
}

export default function DetailsContent({
  rainwork,
  navigation,
  includeReports = false,
  includeApprovalStatus = false,
  includeFindOnMap = false,
  includeOpenInMaps = false
}: Props) {
  return (
    <ScrollView style={{ backgroundColor: WHITE }}>
      <DetailsImage imageUrl={rainwork["image_url"]} />
      {includeApprovalStatus && (
        <ApprovalStatusLabel
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
                renderLink={(text, match) => (
                  <Link url={match.getUrl()}>{text}</Link>
                )}
              />
            </Text>
          </Fragment>
        ) : null}

        {includeReports && (
          <Fragment>
            <Divider />
            <View style={styles.foundItSection}>
              <ReportsText rainwork={rainwork} />
              <ReportButtons rainwork={rainwork} />
            </View>
          </Fragment>
        )}

        {(includeFindOnMap || includeOpenInMaps) && (
          <Fragment>
            <Divider />
            <View style={styles.mapButtonsRow}>
              {includeFindOnMap ? (
                <Button
                  bordered
                  onPress={() =>
                    navigation.navigate(MAP_SCREEN, {
                      selectedRainwork: rainwork
                    })
                  }
                >
                  <Text>Find on Map</Text>
                </Button>
              ) : (
                <View />
              )}
              {includeOpenInMaps ? (
                <Button
                  bordered
                  onPress={() => openMap(rainworkToCoords(rainwork))}
                >
                  <Text>Open in Maps</Text>
                </Button>
              ) : (
                <View />
              )}
            </View>
          </Fragment>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    padding: 16
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    paddingBottom: 6
  },
  subtitle: {
    paddingBottom: 12
  },
  creator: {
    fontStyle: "italic"
  },
  createdDate: {},
  description: {
    paddingVertical: 12
  },
  foundItSection: {
    paddingVertical: 12
  },
  mapButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12
  }
});
