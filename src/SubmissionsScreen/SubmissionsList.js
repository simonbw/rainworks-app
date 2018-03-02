import { View } from 'native-base';
import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { getDeviceId } from '../util';
import SubmissionsListItem, { ITEM_HEIGHT } from './SubmissionsListItem';

const RAINWORKS_URL = 'https://rainworks-backend.herokuapp.com/api/submissions';
// noinspection JSSuspiciousNameCombination
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;

export default class SubmissionsList extends Component {
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
          renderItem={({ item }) => <SubmissionsListItem rainwork={item}/>}
          ItemSeparatorComponent={() =>
            <View style={{ height: SEPARATOR_HEIGHT, backgroundColor: '#BBB' }}/>
          }
          getItemLayout={(data, index) => (
            { length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * index, index }
          )}
        />
      </View>
    );
  }
}
