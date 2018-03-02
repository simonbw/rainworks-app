import { Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { withNavigation } from 'react-navigation';
import { SUCCESS_SCREEN } from './index';
import { SubmissionConsumer } from './SubmissionContext';

const SubmitButton = withNavigation(({ navigation, disabled, submit }) => (
  <SubmissionConsumer>
    {({ submitting }) => (
      <Button
        style={{ position: 'absolute', bottom: 12, right: 12 }}
        onPress={async () => {
          const success = await submit();
          if (success) {
            navigation.replace(SUCCESS_SCREEN);
          }
        }}
        disabled={disabled || submitting}
      >
        <Text>Submit</Text>
      </Button>
    )}
  </SubmissionConsumer>
));

SubmitButton.propTypes = {
  disabled: PropTypes.bool
};

export default SubmitButton;