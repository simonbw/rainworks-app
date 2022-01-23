import { Text, View } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
import {
  ACCEPTED_COLOR,
  EXPIRED_COLOR,
  PENDING_COLOR,
  REJECTED_COLOR,
  WHITE,
} from "../constants/Colors";

const ApprovalStatus = (props) => (
  <View style={[styles.container, styles[props.status]]}>
    <Text style={styles.status}>{statusToText(props.status)}</Text>
    {props.status === "rejected" && props.rejectionReason !== "" && (
      <Text style={styles.rejectionReason}>{props.rejectionReason}</Text>
    )}
  </View>
);

function statusToText(approvalStatus) {
  switch (approvalStatus) {
    case "accepted":
      return "Accepted";
    case "expired":
      return "This rainwork is no longer visible";
    case "pending":
      return "Pending Approval";
      case "edit_pending":
        return "Edit Pending Approval";
    case "rejected":
      return "Rejected";
  }
}

ApprovalStatus.propTypes = {
  status: PropTypes.oneOf(["pending", "accepted", "rejected", "expired"])
    .isRequired,
  rejectionReason: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  accepted: {
    backgroundColor: ACCEPTED_COLOR,
  },
  pending: {
    backgroundColor: PENDING_COLOR,
  },
  edit_pending: {
    backgroundColor: PENDING_COLOR,
  },
  rejected: {
    backgroundColor: REJECTED_COLOR,
  },
  expired: {
    backgroundColor: EXPIRED_COLOR,
  },
  status: {
    color: WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  rejectionReason: {
    color: WHITE,
    textAlign: "center",
  },
});

export default ApprovalStatus;
