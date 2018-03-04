import { Notifications, Permissions } from 'expo';

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

export async function registerDeviceId() {
  const status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  const body = JSON.stringify({
    device_uuid: getDeviceId(),
    push_token: status === 'granted' ? Notifications.getExpoPushTokenAsync() : null,
  });
  const result = await fetch('http://rainworks-backend.herokuapp.com/api/devices', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });
  if (!result.ok) {
    throw new Error('Device Registration Failed', result);
  }
  return await result.json();
}