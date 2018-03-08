import { Notifications, Permissions } from 'expo';
import { Toast } from "native-base";
import { CacheManager } from 'react-native-expo-image-cache';

export function makeQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
    .join('&');
}

export function getDeviceId() {
  return Expo.Constants.deviceId;
}

export function uploadFile(url, file, onProgress = () => null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.onerror = function (e) {
      reject(e);
    };
    
    xhr.upload.addEventListener('progress', function (e) {
      onProgress(e);
    }, false);
    
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(xhr); // Success
      }
    };
    
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
}

export async function registerForPushNotifications() {
  const permissionStatus = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  const result = await fetch('http://rainworks-backend.herokuapp.com/api/devices', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      device_uuid: getDeviceId(),
      push_token: permissionStatus === 'granted' ? Notifications.getExpoPushTokenAsync() : null,
    })
  });
  return await result.json();
}

export function showError(errorMessage) {
  Toast.show({
    text: errorMessage,
    position: 'bottom',
    buttonText: 'X',
    duration: 10 * 1000,
    type: 'warning',
  });
}

export function showSuccess(message) {
  Toast.show({
    text: message,
    position: 'bottom',
    buttonText: 'X',
    duration: 5 * 1000,
    type: 'success',
  });
}

function getCachedUri(stateUri, uri, fallbackUri, listener) {
  if ((typeof stateUri === 'string') && stateUri)
    return stateUri;
  else {
    CacheManager.cache(uri, listener)
  }
  return fallbackUri
}

export const COMMON_DATE_FORMAT = 'MMM DD, YYYY';