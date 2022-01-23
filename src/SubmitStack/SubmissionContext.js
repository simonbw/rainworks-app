import createContext from "create-react-context";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { SUBMIT_URL, SUBMISSIONS_URL } from "../constants/urls";
import {
  COMMON_DATE_FORMAT,
  getDeviceId,
  registerForPushNotifications,
  uploadFile,
} from "../utils/util";
import { showError, showSuccess } from "../utils/toastUtils";

const Context = createContext({});
export const SubmissionConsumer = Context.Consumer;

function calculateProgress(
  posted,
  parsed,
  uploadProgress = 0,
  finalized = false
) {
  let total = 0;
  total += posted ? 0.08 : 0;
  total += parsed ? 0.02 : 0;
  total += 0.7 * uploadProgress;
  total += finalized ? 0.2 : 0;
  return total;
}

export class SubmissionProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = this.getResetState();
  }

  getResetState() {
    return {
      submitting: false,
      uploadProgress: 0,
      submitError: null,
      name: "",
      description: "",
      // creatorName: "",
      // creatorEmail: "",
      lat: 0,
      lng: 0,
      imageUri: null,
      installationDate: moment().format(COMMON_DATE_FORMAT),
    };
  }

  makeProviderValue() {
    return {
      ...this.state,
      setCreatorEmail: (creatorEmail) => this.setState({ creatorEmail }),
      setCreatorName: (creatorName) => this.setState({ creatorName }),
      setDescription: (description) => this.setState({ description }),
      setImageUri: (imageUri) => this.setState({ imageUri }),
      setInstallationDate: (installationDate) =>
        this.setState({ installationDate }),
      setLocation: (lat, lng) => this.setState({ lat, lng }),
      setName: (name) => this.setState({ name }),
      submit: () => this.submit(),
      editRainwork: (rainworkId) => this.editRainwork(rainworkId),
      deleteSubmission: (rainworkId) => this.deleteSubmission(rainworkId),
      markSubmissionFade: (rainworkId) => this.markSubmissionFade(rainworkId),
    };
  }

  getPostData = () => {
    return {
      creator_email: this.state.creatorEmail,
      creator_name: this.state.creatorName,
      description: this.state.description,
      name: this.state.name,
      lat: this.state.lat,
      lng: this.state.lng,
      installation_date: moment(
        this.state.installationDate,
        COMMON_DATE_FORMAT
      ).toISOString(),
      device_uuid: getDeviceId(),
    };
  };

  postToApi = async () => {
    const body = JSON.stringify(this.getPostData());
    const apiPostResult = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!apiPostResult.ok) {
      throw new Error("Error Submitting Rainwork");
    }

    this.setState({ uploadProgress: calculateProgress(true, false, 0) });
    const responseData = await apiPostResult.json();
    this.setState({ uploadProgress: calculateProgress(true, true, 0) });
    return {
      uploadUrl: responseData["image_upload_url"],
      finalizeUrl: responseData["finalize_url"],
    };
  };

  putToApi = async () => {
    const body = JSON.stringify(this.getPostData());

    const apiPutResult = await fetch(SUBMIT_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!apiPutResult.ok) {
      throw new Error("Error Editing Rainwork");
    }

    this.setState({ uploadProgress: calculateProgress(true, false, 0) });
    const responseData = await apiPostResult.json();
    this.setState({ uploadProgress: calculateProgress(true, true, 0) });
    return {
      uploadUrl: responseData["image_upload_url"],
      finalizeUrl: responseData["finalize_url"],
    };
  };

  uploadImage = async (uploadUrl) => {
    // console.log("uploadUrl", uploadUrl);
    const file = { uri: this.state.imageUri, type: "image/jpg" };
    const response = await uploadFile(uploadUrl, file, ({ loaded, total }) =>
      this.setState({
        uploadProgress: calculateProgress(true, true, loaded / total),
      })
    );
    if (response.status >= 400) {
      // console.log(response);
      throw new Error("Upload Error", response.errorMessage);
    }
    this.setState({ uploadProgress: calculateProgress(true, true, 1) });
    // TODO: Find an alternative for this
    // ImageStore.removeImageForTag(this.state.imageUri);
  };

  finalize = async (finalizeUrl) => {
    // console.log("finalizeUrl", finalizeUrl);
    const response = await fetch(finalizeUrl);
    if (!response.ok) {
      // console.log(response);
      throw new Error("Finalize failed", response.errorMessage);
    }
    this.setState({ uploadProgress: calculateProgress(true, true, 1.0, true) });
  };

  improve = async (improveUrl) => {
    const response = await fetch(improveUrl);
    if (!response.ok) {
      console.log(response);
      throw new Error("Improve failed", response.errorMessage);
    }
    this.setState({ uploadProgress: calculateProgress(true, true, 1.0, true) });
  };

  submit = async () => {
    try {
      this.setState({ submitting: true });
      const { uploadUrl, finalizeUrl } = await this.postToApi();
      await this.uploadImage(uploadUrl);
      await this.finalize(finalizeUrl);
      this.setState(this.getResetState());
      showSuccess("Rainwork Submitted");
    } catch (error) {
      // Some API error
      showError("Error Submitting Rainwork");
      // console.error(error);
      this.setState({ submitting: false, submitError: error });
      return false;
    }
    registerForPushNotifications().catch((e) => console.error(e));
    return true;
  };

  editRainwork = async (rainworkId) => {
    try {
      this.setState({
        submitting: true,
        uploadProgress: calculateProgress(true, false, 0),
      });
      const body = JSON.stringify(this.getPostData());

      const apiPutResult = await fetch(`${SUBMISSIONS_URL}/${rainworkId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const responseData = await apiPutResult.json();

      this.setState({ uploadProgress: calculateProgress(true, true, 0) });
      // const { uploadUrl, finalizeUrl } = await this.putToApi();
      const uploadUrl = responseData["image_upload_url"];
      const improveUrl = responseData["improve_url"];
      await this.uploadImage(uploadUrl);
      await this.improve(improveUrl);
      this.setState(this.getResetState());
      showSuccess("Rainwork Edited Successfully");
    } catch (error) {
      // Some API error
      // console.log("editRainworkE", error);
      showError("Error Editing Rainwork");
      console.error(error);
      this.setState({ submitting: false, submitError: error });
      return false;
    }
    return true;
  };

  deleteSubmission = async (rainworkId) => {
    try {
      this.setState({
        submitting: true,
        uploadProgress: calculateProgress(true, false, 0),
      });

      const apiDeleteResult = await fetch(`${SUBMISSIONS_URL}/${rainworkId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await apiDeleteResult.json();

      this.setState({
        uploadProgress: calculateProgress(true, true, 1.0, true),
      });
      this.setState(this.getResetState());
      showSuccess("Rainwork Deleted");
    } catch (error) {
      // Some API error
      console.log(error);
      showError("Error Deleting Rainwork");
      this.setState({ submitting: false, submitError: error });
      return false;
    }
    return true;
  };

  markSubmissionFade = async (rainworkId) => {
    try {
      this.setState({
        submitting: true,
        uploadProgress: calculateProgress(true, false, 0),
      });
      await fetch(`${SUBMISSIONS_URL}/${rainworkId}/expire`, { method: "PUT" });
      this.setState({
        uploadProgress: calculateProgress(true, true, 1.0, true),
      });
      this.setState(this.getResetState());
      showSuccess("Rainwork Expired");
    } catch (error) {
      // Some API error
      // console.log("markSubmissionFade", error);
      showError("Error Fading Rainwork");
      // console.error(error);
      this.setState({ submitting: false, submitError: error });
      return false;
    }
    return true;
  };

  render() {
    return (
      <Context.Provider value={this.makeProviderValue()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
