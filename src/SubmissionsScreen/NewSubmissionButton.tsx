import React from "react";
import { NavigationScreenProp } from "react-navigation";
import { WHITE } from "../constants/Colors";
import { Button, Icon } from "native-base";
import { SUBMIT_STACK } from "../constants/ScreenNames";

interface Props {
  navigation: NavigationScreenProp<{}>;
  tintColor?: string;
}

export default function NewSubmissionButton({
  navigation,
  tintColor = WHITE
}: Props) {
  return (
    <Button
      transparent
      style={{ height: "100%" }}
      onPress={() => navigation.navigate(SUBMIT_STACK)}
    >
      <Icon name="create" style={{ color: tintColor }} />
    </Button>
  );
}
