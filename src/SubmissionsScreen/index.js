import moment from 'moment';
import { Body, Button, H1, Icon, ListItem, Text, View } from 'native-base';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { SUBMIT_STACK } from '../MainNavigator';
import DrawerMenuButton from '../MapStack/DrawerMenuButton';
import { getDeviceId } from '../util';

const RAINWORKS_URL = 'https://rainworks-backend.herokuapp.com/api/submissions';

class SubmissionScreen extends Component {
  static propTypes = {};
  
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      loading: false
    }
  }
  
  async componentDidMount() {
    await this.loadSubmissions();
  }
  
  fetchSubmissions = async () => {
    const response = await fetch(RAINWORKS_URL + `/${getDeviceId()}`);
    if (!response.ok) {
      throw new Error('Api Error', response.errorText);
    }
    return await response.json();
  };
  
  loadSubmissions = async () => {
    this.setState({ loading: true });
    try {
      const submissions = await this.fetchSubmissions();
      this.setState({ submissions });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      this.setState({ loading: false });
    }
  };
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.submissions}
          keyExtractor={(item) => item.id}
          onRefresh={this.loadSubmissions}
          refreshing={this.state.loading}
          renderItem={({ item }) => (
            <ListItem>
              <Body>
                <H1>{item.name}</H1>
                <Text>{moment(item.created_at).format('MMM DD, YYYY')}</Text>
                <Text>{item.approval_status}</Text>
              </Body>
            </ListItem>
          )}
        />
      </View>
    );
  }
}

const NewSubmissionButton = ({ navigation }) => (
  <Button transparent onPress={() => navigation.navigate(SUBMIT_STACK)}>
    <Icon name="create"/>
  </Button>
);

export const SUBMISSIONS_SCREEN_PAGE = 'SUBMISSIONS_SCREEN_PAGE';

export default StackNavigator({
  [SUBMISSIONS_SCREEN_PAGE]: {
    screen: SubmissionScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Submissions',
      headerLeft: <DrawerMenuButton/>,
      headerRight: <NewSubmissionButton navigation={navigation}/>,
    })
  },
}, {
  initialScreen: SUBMISSIONS_SCREEN_PAGE,
});