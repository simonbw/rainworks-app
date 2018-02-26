import { Button, Card, CardItem, Left, Right, Text } from 'native-base';
import React, { Component } from 'react';
import { makeQueryString, uploadFile } from '../util';
import ImageSelect from './ImageSelect';
import InfoForm from './InfoForm';
import UploadGuidelines from './UploadGuidelines';

const RAINWORKS_URL = 'https://rainworks-backend.herokuapp.com/rainworks';

class UploadPageCard extends Component {
  static propTypes = {};
  
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      imageUri: null,
      creatorEmail: '',
      creatorName: 'Simon',
      description: '',
      name: 'Test Rainwork Please Ignore',
      lat: 20,
      lng: 20,
    };
    
    this.pages = [
      () => <UploadGuidelines/>,
      () => <InfoForm
        creatorEmail={this.state.creatorEmail}
        creatorName={this.state.creatorName}
        description={this.state.description}
        name={this.state.name}
        
        setCreatorEmail={(creatorEmail) => this.setState({ creatorEmail })}
        setCreatorName={(creatorName) => this.setState({ creatorName })}
        setDescription={(description) => this.setState({ description })}
        setName={(name) => this.setState({ name })}
      />,
      () => <ImageSelect setImage={this.setImage} image={this.state.imageUri}/>,
    ];
  }
  
  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };
  
  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };
  
  setImage = (imageUri) => {
    this.setState({ imageUri });
  };
  
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
  
  submit = async () => {
    console.log('submit', this.state.imageUri);
    const postUrl = RAINWORKS_URL + makeQueryString(this.getPostData());
    const apiPostResult = await fetch(postUrl, {
      method: 'POST',
    });
    
    if (!apiPostResult.ok) {
      throw new Error('Failed to submit', apiPostResult.errorMessage);
    }
    
    const data = await apiPostResult.json();
    console.log(data);
    
    const uploadUrl = data['image_upload_url'];
    const s3Result = await uploadFile(uploadUrl, { uri: this.state.imageUri, type: 'image/jpg' });
    console.log(s3Result);
  };
  
  render() {
    const isFirstPage = this.state.page <= 0;
    const isLastPage = this.state.page < this.pages.length - 1;
    return (
      <Card>
        {this.pages[this.state.page]()}
        <CardItem footer>
          <Left>
            <Button disabled={isFirstPage} onPress={this.previousPage}>
              <Text>Back</Text>
            </Button>
          </Left>
          <Right>
            <Button onPress={isLastPage ? this.nextPage : () => this.submit().catch(console.error)}>
              <Text>{isLastPage ? 'Next' : 'Submit'}</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default UploadPageCard;