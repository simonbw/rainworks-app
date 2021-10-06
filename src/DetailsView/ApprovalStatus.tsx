import { Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import {
  ACCEPTED_COLOR,
  EXPIRED_COLOR,
  PENDING_COLOR,
  REJECTED_COLOR,
  WHITE
} from "../constants/Colors";

export type ApprovalStatus = "pending" | "accepted" | "rejected" | "expired";

interface Props {
  status: ApprovalStatus;
  rejectionReason: string;
}

export default function ApprovalStatusLabel({
  status,
  rejectionReason
}: Props) {
  return (
    <View style={[styles.container, styles[status]]}>
      <Text style={styles.status}>{statusToText(status)}</Text>
      {status === "rejected" && rejectionReason && (
        <Text style={styles.rejectionReason}>{rejectionReason}</Text>
      )}
    </View>
  );
}

function statusToText(approvalStatus: ApprovalStatus) {
  switch (approvalStatus) {
    case "accepted":
      return "Accepted";
    case "expired":
      return "This rainwork is no longer visible";
    case "pending":
      return "Pending Approval";
    case "rejected":
      return "Rejected";
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 12
  },
  accepted: {
    backgroundColor: ACCEPTED_COLOR
  },
  pending: {
    backgroundColor: PENDING_COLOR
  },
  rejected: {
    backgroundColor: REJECTED_COLOR
  },
  expired: {
    backgroundColor: EXPIRED_COLOR
  },
  status: {
    color: WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14
  },
  rejectionReason: {
    color: WHITE,
    textAlign: "center"
  }
});
