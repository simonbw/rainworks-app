import { Text, View } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { SubmissionsConsumer } from '../contexts/SubmissionsContext';
import Divider, { DIVIDER_HEIGHT } from '../Divider';
import SubmissionsListItem, { ITEM_HEIGHT } from './SubmissionsListItem';

class UnconnectedSubmissionsList extends Component {
  static propTypes = {
    submissions: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
  };
  
  componentDidMount() {
    if (!this.props.loading) {
      this.props.refresh();
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
          ItemSeparatorComponent={Divider}
          getItemLayout={(data, index) => (
            { length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + DIVIDER_HEIGHT) * index, index }
          )}
          initialNumToRender={Math.ceil(Dimensions.get('window').height / ITEM_HEIGHT)}
          ListEmptyComponent={() => (
            <View style={{ padding: 16 }}>
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