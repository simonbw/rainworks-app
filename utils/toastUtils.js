import Toast from "react-native-toast-message";

export function showError(errorMessage) {
  Toast.show({
    text1: errorMessage,
    position: "bottom",
    // buttonText: "X",
    visibilityTime: 10 * 1000,
    type: "error",
  });
}

export function showSuccess(message) {
  Toast.show({
    text1: message,
    position: "bottom",
    // buttonText: "X",
    visibilityTime: 5 * 1000,
    type: "success",
  });
}
