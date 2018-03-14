import { Notifications } from 'expo';
import { Text, Toast } from "native-base";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { NavigatorConsumer } from './contexts/NavigatorContext';
import { SubmissionsConsumer } from './contexts/SubmissionsContext';
import { SUBMISSION_DETAILS_SCREEN, SUBMISSIONS_LIST_SCREEN } from './SubmissionsScreen';

class NotificationHandler extends Component {
  static propTypes = {
    getNavigator: PropTypes.func.isRequired,
    getSubmission: PropTypes.func.isRequired,
    refreshSubmissions: PropTypes.func.isRequired,
  };
  
  componentDidMount() {
    Notifications.addListener((notification) => {
      console.log('notification:', notification);
      this.props.refreshSubmissions();
      const notificationType = notification['data']['notification_type'];
      const submissionId = notification['data']['rainwork_id'];
      
      if (notification['origin'] === 'selected') { // tapped on notification
        this.navigateToSubmission(submissionId);
      } else { // app is open
        this.showToast(notificationType, submissionId);
      }
    })
  }
  
  navigateToSubmission(submissionId) {
    const submission = this.props.getSubmission(submissionId);
    const navigationAction = submission ? {
      type: NavigationActions.REPLACE,
      routeName: SUBMISSION_DETAILS_SCREEN,
      params: { rainwork: submission },
    } : { // submission not found for some reason
      type: NavigationActions.REPLACE,
      routeName: SUBMISSIONS_LIST_SCREEN,
    };
    this.props.getNavigator().dispatch(
      NavigationActions.navigate(navigationAction)
    );
  }
  
  showToast(notificationType, submissionId) {
    Toast.show({
      text: this.renderToastText(notificationType, submissionId),
      position: 'bottom',
      buttonText: 'X',
      duration: 5 * 1000,
      type: this.getToastType(notificationType),
    });
  }
  
  renderToastText(notificationType, submissionId) {
    return (
      <Text
        style={{ color: '#FFF' }}
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
      case 'rejected':
        return 'danger';
      case 'accepted':
        return 'success';
      case 'expired':
        return 'warning';
    }
  }
  
  getToastText(notificationType) {
    switch (notificationType) {
      case 'rejected':
        return 'Your submission was rejected';
      case 'accepted':
        return 'Your submission was accepted';
      case 'expired':
        return 'Your rainwork has expired';
    }
  }
  
  render() {
    return null;
  }
}

export default () => (
  <SubmissionsConsumer>
    {({ getSubmission, refresh }) => (
      <NavigatorConsumer>
        {({ getNavigator }) => (
          <NotificationHandler
            getNavigator={getNavigator}
            getSubmission={getSubmission}
            refreshSubmissions={refresh}
          />
        )}
      </NavigatorConsumer>
    )}
  </SubmissionsConsumer>
);
