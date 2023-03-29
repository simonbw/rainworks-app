import React, { Component } from "react";
// import createContext from "create-react-context";
import PropTypes from "prop-types";
import { REPORTS_URL } from "../constants/urls";
import { getDeviceId, makeQueryString, uploadFile } from "../../utils/util";
import { showError, showSuccess } from "../../utils/toastUtils";

const Context = React.createContext({});

export const ReportsConsumer = Context.Consumer;

export class ReportsProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      loading: false,
      submitting: false,
    };
  }

  async componentDidMount() {
    await this.loadReports();
  }

  loadReports = async () => {
    this.setState({ loading: true });
    const response = await fetch(
      REPORTS_URL + makeQueryString({ device_uuid: getDeviceId() })
    );
    if (!response.ok) {
      showError("Loading Reports Failed");
    } else {
      const reports = await response.json();
      this.setState({ reports, loading: false });
    }
  };

  submitReport = async (rainworkId, reportType, imageUri, description) => {
    try {
      this.setState({ submitting: true });
      const responseData = await this.postToApi(
        rainworkId,
        reportType,
        description
      );
      const report = responseData["report"];
      const uploadUrl = responseData["image_upload_url"];

      if (imageUri) {
        await this.uploadImage(uploadUrl, imageUri);
      }

      if (reportType === "found_it") {
        showSuccess("Share a picture! #rainworks");
      } else {
        showSuccess("Report Submitted");
      }

      const reports = this.state.reports.concat([report]);
      this.setState({ reports });

      return report;
    } catch (e) {
      console.error(e);
      showError("Submitting Report Failed");
    } finally {
      this.setState({ submitting: false });
    }
  };

  postToApi = async (rainworkId, reportType, description) => {
    const params = {
      device_uuid: getDeviceId(),
      rainwork_id: rainworkId,
      report_type: reportType,
    };
    if (description) {
      params["description"] = description;
    }
    const response = await fetch(REPORTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      throw new Error(`Error submitting to API: ${response.errorMessage}`);
    }
    return await response.json();
  };

  uploadImage = async (uploadUrl, imageUri) => {
    const file = { uri: imageUri, type: "image/jpg" };
    const response = await uploadFile(
      uploadUrl,
      file,
      ({ loaded, total }) => null // TODO: progress
    );
    if (response.status >= 400) {
      throw new Error("Image Upload Error", response.errorMessage);
    }
    // TODO: Find an alternative for this
    // ImageStore.removeImageForTag(imageUri);
  };

  getReport = (rainworkId, reportType) => {
    return this.state.reports.find(
      (report) =>
        report["report_type"] === reportType &&
        report["rainwork_id"] === rainworkId
    );
  };

  hasReport = (rainworkId, reportType) => {
    if (!reportType) {
      // Any type
      return this.state.reports.some(
        (report) => report["rainwork_id"] === rainworkId
      );
    } else {
      return this.state.reports.some(
        (report) =>
          report["report_type"] === reportType &&
          report["rainwork_id"] === rainworkId
      );
    }
  };

  getProviderValue() {
    return {
      ...this.state,
      getReport: this.getReport,
      hasReport: this.hasReport,
      refresh: this.loadReports,
      submitReport: this.submitReport,
    };
  }

  render() {
    return (
      <Context.Provider value={this.getProviderValue()}>
        {this.props.children || null}
      </Context.Provider>
    );
  }
}
