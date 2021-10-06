import { Toast } from "native-base";

export function showError(errorMessage) {
  Toast.show({
    text: errorMessage,
    position: "bottom",
    buttonText: "X",
    duration: 10 * 1000,
    type: "warning"
  });
}

export function showSuccess(message) {
  Toast.show({
    text: message,
    position: "bottom",
    buttonText: "X",
    duration: 5 * 1000,
    type: "success"
  });
}
