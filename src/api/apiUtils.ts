/**
 * Uploads a file to a string. Takes an optional onProgress callback to be
 * updated of how far along the download is.
 */
export function uploadFile(
  url: string,
  file: { uri: string; type: string },
  onProgress: (e: ProgressEvent) => void = () => null
) {
  return new Promise<XMLHttpRequest>((resolve, reject) => {
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

/**
 * Upload an image.
 */
export async function uploadImage(uploadUrl: string, imageUri: string) {
  const file = { uri: imageUri, type: "image/jpg" };
  const response = await uploadFile(
    uploadUrl,
    file,
    ({ loaded, total }) => null // TODO: progress
  );
  if (response.status >= 400) {
    console.log(response);
    throw new Error("Image Upload Error: " + (response as any).errorMessage);
  }
  // TODO: Find an alternative for this
  // ImageStore.removeImageForTag(imageUri);
}
