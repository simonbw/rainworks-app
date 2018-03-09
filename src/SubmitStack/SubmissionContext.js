import createContext from 'create-react-context';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SUBMIT_URL } from '../urls';
import { COMMON_DATE_FORMAT, getDeviceId, registerForPushNotifications, showError, showSuccess, uploadFile } from '../util';

const Context = createContext({});
export const SubmissionConsumer = Context.Consumer;

function calculateProgress(posted, parsed, uploadProgress = 0) {
  let total = 0;
  total += posted ? 0.08 : 0;
  total += parsed ? 0.02 : 0;
  total += 0.9 * uploadProgress;
  return total;
}

export class SubmissionProvider extends Component {
  static propTypes = {
    children: PropTypes.node
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
      name: '',
      description: '',
      creatorName: '',
      creatorEmail: '',
      lat: 0,
      lng: 0,
      imageUri: null,
      installationDate: moment().format(COMMON_DATE_FORMAT),
    }
  }
  
  makeProviderValue() {
    return {
      ...this.state,
      setCreatorEmail: (creatorEmail) => this.setState({ creatorEmail }),
      setCreatorName: (creatorName) => this.setState({ creatorName }),
      setDescription: (description) => this.setState({ description }),
      setImageUri: (imageUri) => this.setState({ imageUri }),
      setInstallationDate: (installationDate) => this.setState({ installationDate }),
      setLocation: (lat, lng) => this.setState({ lat, lng }),
      setName: (name) => this.setState({ name }),
      submit: () => this.submit(),
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
      installation_date: moment(this.state.installationDate, COMMON_DATE_FORMAT).toISOString(),
      device_uuid: getDeviceId(),
    }
  };
  
  postToApi = async () => {
    const body = JSON.stringify(this.getPostData());
    const apiPostResult = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    
    if (!apiPostResult.ok) {
      throw new Error('Error Submitting Rainwork');
    }
    
    this.setState({ uploadProgress: calculateProgress(true, false, 0) });
    const responseData = await apiPostResult.json();
    this.setState({ uploadProgress: calculateProgress(true, true, 0) });
    return responseData['image_upload_url'];
  };
  
  uploadImage = async (uploadUrl) => {
    const file = { uri: this.state.imageUri, type: 'image/jpg' };
    const response = await uploadFile(
      uploadUrl,
      file,
      ({ loaded, total }) => this.setState({ uploadProgress: calculateProgress(true, true, loaded / total) })
    );
    if (response.status >= 400) {
      console.log(response);
      throw new Error('Upload Error', response.errorMessage);
    }
    this.setState({ uploadProgress: calculateProgress(true, true, 1) });
  };
  
  submit = async () => {
    try {
      this.setState({ submitting: true });
      const uploadUrl = await this.postToApi();
      await this.uploadImage(uploadUrl);
      this.setState(this.getResetState());
      showSuccess('Rainwork Submitted');
    } catch (error) { // Some API error
      showError('Error Submitting Rainwork');
      console.error(error);
      this.setState({ submitting: false, submitError: error });
      return false;
    }
    registerForPushNotifications().catch((e) => console.error(e));
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
