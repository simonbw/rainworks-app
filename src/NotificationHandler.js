import * as Notifications from "expo-notifications";
import { Text, Toast } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavigationActions, withNavigation } from "react-navigation";
import { WHITE } from "./constants/Colors";
import { SubmissionsConsumer } from "./contexts/SubmissionsContext";
import {
  SUBMISSION_DETAILS_SCREEN,
  SUBMISSIONS_LIST_SCREEN,
} from "./SubmissionsScreen";

// TODO: NAVIGATION IS BROKEN FIX IT !!!

class NotificationHandler extends Component {
  static propTypes = {
    // navigator: PropTypes.func.isRequired,
    getSubmission: PropTypes.func.isRequired,
    refreshSubmissions: PropTypes.func.isRequired,
  };

  componentDidMount() {
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("notification:", notification);
      this.props.refreshSubmissions();
      const notificationType = notification["data"]["notification_type"];
      const submissionId = notification["data"]["rainwork_id"];

      if (notification["origin"] === "selected") {
        // tapped on notification
        this.navigateToSubmission(submissionId);
      } else {
        // app is open
        this.showToast(notificationType, submissionId);
      }
    });
  }

  navigateToSubmission(submissionId) {
    const submission = this.props.getSubmission(submissionId);
    const navigationAction = submission
      ? {
          type: NavigationActions.REPLACE,
          routeName: SUBMISSION_DETAILS_SCREEN,
          params: { rainwork: submission },
        }
      : {
          // submission not found for some reason
          type: NavigationActions.REPLACE,
          routeName: SUBMISSIONS_LIST_SCREEN,
        };
    // this.props.navigator.dispatch(NavigationActions.navigate(navigationAction));
  }

  showToast(notificationType, submissionId) {
    Toast.show({
      text: this.renderToastText(notificationType, submissionId),
      position: "bottom",
      buttonText: "X",
      duration: 5 * 1000,
      type: this.getToastType(notificationType),
    });
  }

  renderToastText(notificationType, submissionId) {
    return (
      <Text
        style={{ color: WHITE }}
        onPress={() => {
          this.navigateToSubmission(submissionId);
          Toast.toastInstance._root.closeToast();
        }}
      >
        {this.getToastText(notificationType)}
      </Text>
    );
  }

  getToastType(notificationType) {
    switch (notificationType) {
      case "rejected":
        return "danger";
      case "accepted":
        return "success";
      case "expired":
        return "warning";
    }
  }

  getToastText(notificationType) {
    switch (notificationType) {
      case "rejected":
        return "Your submission was rejected";
      case "accepted":
        return "Your submission was accepted";
      case "expired":
        return "Your rainwork has expired";
    }
  }

  render() {
    return null;
  }
}

const NotificationHandlerWithNavigation = withNavigation(NotificationHandler);

export default () => (
  <SubmissionsConsumer>
    {({ getSubmission, refresh }) => (
      <NotificationHandler
        getSubmission={getSubmission}
        refreshSubmissions={refresh}
      />
    )}
  </SubmissionsConsumer>
);
