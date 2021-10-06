import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { DEVICES_URL } from "../constants/urls";

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
  return Expo.Constants.deviceId;
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
        push_token: await Notifications.getExpoPushTokenAsync()
      })
    });
    return await result.json();
  } else {
    console.warn("Notification Permissions Denied", permissionResult);
  }
  return null;
}
