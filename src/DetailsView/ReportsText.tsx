import moment from "moment";
import { Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { FOUND_IT_COLOR, REPORT_COLOR } from "../constants/Colors";
import { useReportsContext } from "../contexts/ReportsContext";
import { COMMON_DATE_FORMAT } from "../utils/util";
import { Rainwork } from "../api/rainworksApi";

interface Props {
  rainwork: Rainwork;
}

export default function ReportsText({ rainwork }: Props) {
  const { getReport } = useReportsContext();
  const rainworkId = rainwork["id"];

  const foundItReport = getReport(rainworkId, "found_it");
  const missingReport = getReport(rainworkId, "missing");
  const fadedReport = getReport(rainworkId, "faded");
  const inappropriateReport = getReport(rainworkId, "inappropriate");

  return (
    <View>
      <Text style={styles.foundItCount}>
        {getFoundItCountText(
          Boolean(foundItReport),
          rainwork["found_it_count"]
        )}
      </Text>

      {Boolean(foundItReport) && (
        <Text style={styles.foundItText}>
          You found this rainwork on{" "}
          {moment(foundItReport["created_at"]).format(COMMON_DATE_FORMAT)}.
        </Text>
      )}

      {Boolean(missingReport) && (
        <Text style={styles.reportText}>
          You reported this rainwork missing on{" "}
          {moment(missingReport["created_at"]).format(COMMON_DATE_FORMAT)}.
        </Text>
      )}

      {Boolean(fadedReport) && (
        <Text style={styles.reportText}>
          You reported this rainwork faded on{" "}
          {moment(fadedReport["created_at"]).format(COMMON_DATE_FORMAT)}.
        </Text>
      )}

      {inappropriateReport && (
        <Text style={styles.reportText}>
          You reported this rainwork as inappropriate on{" "}
          {moment(inappropriateReport["created_at"]).format(COMMON_DATE_FORMAT)}
          .
        </Text>
      )}
    </View>
  );
}

function getFoundItCountText(
  userHasFoundIt: boolean,
  foundItCount: number
): string {
  if (userHasFoundIt) {
    if (foundItCount <= 1) {
      return "You are the first person to have found this rainwork!";
    } else if (foundItCount === 2) {
      return "You and 1 other person have found this rainwork.";
    } else {
      return `You and ${foundItCount -
        1} other people have found this rainwork.`;
    }
  } else {
    if (foundItCount === 0) {
      return "No one has found this rainwork yet.";
    } else if (foundItCount === 1) {
      return "1 person has found this rainwork.";
    } else {
      return `${foundItCount} people have found this rainwork.`;
    }
  }
}

const styles = StyleSheet.create({
  foundItCount: {
    marginBottom: 12
  },
  foundItText: {
    marginBottom: 12,
    fontStyle: "italic",
    color: FOUND_IT_COLOR
  },
  reportText: {
    marginBottom: 12,
    fontStyle: "italic",
    color: REPORT_COLOR
  }
});
