import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { DEVICES_URL } from "../constants/urls";
import { Platform, NativeModules } from "react-native";
import Constants from "expo-constants";

export const COMMON_DATE_FORMAT = "MMM Do, YYYY";

export function makeQueryString(params) {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(value)
      )
      .join("&")
  );
}

export function getDeviceId() {
  return Constants.installationId
  // return Platform.OS === "android"
  //   ? Constants.installationId
  //   : NativeModules.SettingsManager.settings.EXDeviceInstallUUIDKey;
}

export function uploadFile(url, file, onProgress = () => null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onerror = function(e) {
      reject(e);
    };

    xhr.upload.addEventListener(
      "progress",
      function(e) {
        onProgress(e);
      },
      false
    );

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(xhr); // Success
      }
    };

    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  });
}

export async function registerForPushNotifications() {
  const permissionResult = await Permissions.askAsync(
    Permissions.NOTIFICATIONS
  );
  if (permissionResult && permissionResult.status === "granted") {
    const url = `${DEVICES_URL}/${encodeURIComponent(getDeviceId())}`;
    console.log("register device url:", url);
    const result = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        push_token: await Notifications.getExpoPushTokenAsync(),
      }),
    });
    return await result.json();
  } else {
    console.warn("Notification Permissions Denied", permissionResult);
  }
  return null;
}
