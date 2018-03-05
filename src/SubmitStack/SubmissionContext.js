import createContext from 'create-react-context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SUBMIT_URL } from '../urls';
import { getDeviceId, showError, showSuccess, uploadFile } from '../util';

const Context = createContext({});
export const SubmissionConsumer = Context.Consumer;

const DEFAULT_RAINWORK_DATA = {
  name: '',
  description: '',
  creatorName: '',
  creatorEmail: '',
  lat: 0,
  lng: 0,
  imageUri: null,
};

export class SubmissionProvider extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      submitError: null,
      ...DEFAULT_RAINWORK_DATA
    }
  }
  
  makeProviderValue() {
    return {
      ...this.state,
      setCreatorEmail: (creatorEmail) => this.setState({ creatorEmail }),
      setCreatorName: (creatorName) => this.setState({ creatorName }),
      setDescription: (description) => this.setState({ description }),
      setName: (name) => this.setState({ name }),
      setImageUri: (imageUri) => this.setState({ imageUri }),
      setLocation: (lat, lng) => this.setState({ lat, lng }),
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
    
    const responseData = await apiPostResult.json();
    return responseData['image_upload_url'];
  };
  
  uploadImage = async (uploadUrl) => {
    const file = { uri: this.state.imageUri, type: 'image/jpg' };
    const response = await uploadFile(uploadUrl, file, (e) => console.log('progress...', e.loaded, e.total));
    if (response.status >= 400) {
      throw new Error('Upload Error', response.errorMessage);
    }
  };
  
  submit = async () => {
    try {
      this.setState({ submitting: true });
      const uploadUrl = await this.postToApi();
      await this.uploadImage(uploadUrl);
      this.setState({ submitting: false, ...DEFAULT_RAINWORK_DATA });
      showSuccess('Rainwork Submitted');
    } catch (error) { // Some API error
      showError('Error Submitting Rainwork');
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
