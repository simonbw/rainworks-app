import { SUBMISSIONS_URL } from "../constants/urls";
import { makeQueryString, getDeviceId } from "../utils/util";

// TODO: Type Submission better
export type Submission = any;

/**
 * Fetches the list of this user's submission from the backend.
 */
export async function fetchSubmissions(): Promise<Submission[]> {
  const response = await fetch(
    // eslint-disable-next-line @typescript-eslint/camelcase
    SUBMISSIONS_URL + makeQueryString({ device_uuid: getDeviceId() })
  );
  if (!response.ok) {
    throw new Error("Loading Submissions Failed");
  } else {
    const submissions: Submission[] = await response.json();
    submissions.sort(
      (a, b) =>
        new Date(b["created_at"]).getTime() -
        new Date(a["created_at"]).getTime()
    );
    return submissions;
  }
}

export async function postSubmission() {
  const body = JSON.stringify(this.getPostData());
  const apiPostResult = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  });

  if (!apiPostResult.ok) {
    throw new Error("Error Submitting Rainwork");
  }

  this.setState({ uploadProgress: calculateProgress(true, false, 0) });
  const responseData = await apiPostResult.json();
  this.setState({ uploadProgress: calculateProgress(true, true, 0) });
  return {
    uploadUrl: responseData["image_upload_url"],
    finalizeUrl: responseData["finalize_url"]
  };
}
