import { REPORTS_URL } from "../constants/urls";
import { getDeviceId } from "../utils/util";

type Report = any; // TODO: Better report type

interface PostReportResponse {
  report: Report;
  image_upload_url: string;
}

/**
 * Submits a report to the backend.
 */
export async function postReport(
  rainworkId: string,
  reportType: string,
  description?: string
): Promise<PostReportResponse> {
  /* eslint-disable @typescript-eslint/camelcase */
  const params: { [key: string]: string } = {
    device_uuid: getDeviceId(),
    rainwork_id: rainworkId,
    report_type: reportType
  };
  /* eslint-enable @typescript-eslint/camelcase */
  if (description) {
    params["description"] = description;
  }
  const response = await fetch(REPORTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  if (!response.ok) {
    throw new Error(`Error submitting to API: ${response.errorMessage}`);
  }
  return await response.json();
}
