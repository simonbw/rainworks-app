import { Notifications, Permissions } from 'expo';
import { Toast } from "native-base";
import { CacheManager } from 'react-native-expo-image-cache';
import { DEVICES_URL } from './urls';

export const COMMON_DATE_FORMAT = 'MMM Do, YYYY';

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
  const permissionResult = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (permissionResult && permissionResult.status === 'granted') {
    const url = `${DEVICES_URL}/${encodeURIComponent(getDeviceId())}`;
    console.log('register device url:', url);
    const result = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        push_token: await Notifications.getExpoPushTokenAsync(),
      })
    });
    return await result.json();
  } else {
    console.warn('Notification Permissions Denied', permissionResult);
  }
  return null;
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

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export function coordsToRegion(l) {
  return {
    latitude: l.latitude,
    longitude: l.longitude,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  }
}

export function rainworkToCoords(r) {
  return { latitude: r['lat'], longitude: r['lng'] };
}