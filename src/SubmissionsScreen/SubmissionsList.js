import { Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SubmissionsConsumer } from '../contexts/SubmissionsContext';
import SubmissionsListItem, { ITEM_HEIGHT } from './SubmissionsListItem';

// noinspection JSSuspiciousNameCombination
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;

class UnconnectedSubmissionsList extends Component {
  static propTypes = {
    submissions: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
  };
  
  componentDidMount() {
    if (!this.props.loading) {
      this.refresh();
    }
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.submissions}
          keyExtractor={(item) => item.id}
          onRefresh={this.props.refresh}
          refreshing={this.props.loading}
          renderItem={({ item }) => <SubmissionsListItem rainwork={item}/>}
          ItemSeparatorComponent={() =>
            <View style={{ height: SEPARATOR_HEIGHT, backgroundColor: '#BBB' }}/>
          }
          getItemLayout={(data, index) => (
            { length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * index, index }
          )}
          ListEmptyComponent={() => (
            <View style={{ padding: 12 }}>
              <Text>You have no submissions</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default () => (
  <SubmissionsConsumer>
    {({ submissions, loading, refresh }) => (
      <UnconnectedSubmissionsList submissions={submissions} loading={loading} refresh={refresh}/>
    )}
  </SubmissionsConsumer>
)