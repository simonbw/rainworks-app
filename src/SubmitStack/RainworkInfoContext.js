import createContext from 'create-react-context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { uploadFile } from '../util';

const RAINWORKS_URL = 'https://rainworks-backend.herokuapp.com/rainworks';

const Context = createContext({});
export const RainworkInfoConsumer = Context.Consumer;

export class RainworkInfoProvider extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      submitError: null,
      name: '',
      description: '',
      creatorName: '',
      creatorEmail: '',
      lat: 0,
      lng: 0,
      imageUri: null,
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
      creatorEmail: this.state.creatorEmail,
      creatorName: this.state.creatorName,
      description: this.state.description,
      name: this.state.name,
      lat: this.state.lat,
      lng: this.state.lng,
    }
  };
  
  postToApi = async () => {
    const body = JSON.stringify(this.getPostData());
    console.log(`POST to ${RAINWORKS_URL} with data ${body}`);
    const apiPostResult = await fetch(RAINWORKS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    
    if (!apiPostResult.ok) {
      throw new Error('API Error: ', apiPostResult.errorMessage);
    }
    
    const responseData = await apiPostResult.json();
    console.log(responseData);
    return responseData['image_upload_url'];
  };
  
  uploadImage = async (uploadUrl) => {
    const file = { uri: this.state.imageUri, type: 'image/jpg' };
    const s3Result = await uploadFile(uploadUrl, file, () => console.log('progress...'));
    console.log(s3Result);
    // TODO: Throw error on upload fail
    // TODO: Progress stuff
  };
  
  submit = async () => {
    try {
      this.setState({ submitting: true });
      const uploadUrl = await this.postToApi();
      await this.uploadImage(uploadUrl);
      this.setState({ submitting: false });
    } catch (error) { // Some API error
      console.error(error);
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
