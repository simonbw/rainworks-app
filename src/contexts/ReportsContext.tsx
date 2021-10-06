import React, { useContext, useState, useEffect } from "react";
import { REPORTS_URL } from "../constants/urls";
import { showError, showSuccess } from "../utils/toastUtils";
import { getDeviceId, makeQueryString } from "../utils/util";
import { postReport } from "../api/reportsApi";
import { uploadImage } from "../api/apiUtils";

export type Report = any; // TODO: Better report type
export type ReportType = string; // TODO: Better report type type

interface State {
  reports: ReadonlyArray<Report>;
  loading: boolean;
  submitting: boolean;
}

interface Value extends State {
  getReport: (rainworkId: string, reportType: ReportType) => Report | undefined;
  hasReport: (rainworkId: string, reportType?: ReportType) => boolean;
  refresh: () => void;
  submitReport: (
    rainworkId: string,
    reportType: ReportType,
    imageUri?: string,
    description?: string
  ) => Report;
}

const ReportsContext = React.createContext<Value>(undefined as any);

export const ReportsConsumer = ReportsContext.Consumer;

export function useReportsContext() {
  return useContext(ReportsContext);
}

function findReport(
  reports: Report[],
  rainworkId: string,
  reportType?: ReportType
): Report | undefined {
  if (!reportType) {
    // Any type
    return reports.find(report => report["rainwork_id"] === rainworkId);
  } else {
    return reports.find(
      report =>
        report["report_type"] === reportType &&
        report["rainwork_id"] === rainworkId
    );
  }
}

interface Props {
  children: React.ReactNode;
}

export function ReportsProvider({ children = null }: Props) {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);

  async function loadReports() {
    setLoading(true);
    const response = await fetch(
      // eslint-disable-next-line @typescript-eslint/camelcase
      REPORTS_URL + makeQueryString({ device_uuid: getDeviceId() })
    );
    if (!response.ok) {
      showError("Loading Reports Failed");
    } else {
      const newReports: Report[] = await response.json();
      setReports(newReports);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  });

  return (
    <ReportsContext.Provider
      value={{
        loading,
        submitting,
        reports,
        getReport: (rainworkId, reportType) =>
          findReport(reports, rainworkId, reportType),
        hasReport: (rainworkId, reportType) =>
          findReport(reports, rainworkId, reportType) !== undefined,
        submitReport: async (
          rainworkId: string,
          reportType: ReportType,
          imageUri?: string,
          description?: string
        ) => {
          try {
            setSubmitting(true);
            const responseData = await postReport(
              rainworkId,
              reportType,
              description
            );
            const report = responseData.report;
            const uploadUrl = responseData.image_upload_url;

            if (imageUri) {
              await uploadImage(uploadUrl, imageUri);
            }

            if (reportType === "found_it") {
              showSuccess("Share a picture! #rainworks");
            } else {
              showSuccess("Report Submitted");
            }

            setReports(oldReports => oldReports.concat([report]));

            return report;
          } catch (e) {
            console.error(e);
            showError("Submitting Report Failed");
          } finally {
            setSubmitting(false);
          }
        },
        refresh: loadReports
      }}
    >
      {children || null}
    </ReportsContext.Provider>
  );
}
