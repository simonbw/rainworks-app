import { Text, View } from "native-base";
import PropTypes from "prop-types";
import React, { Component, useEffect, useCallback } from "react";
import { Dimensions, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SubmissionsConsumer } from "../../contexts/SubmissionsContext";
import Divider, { DIVIDER_HEIGHT } from "../../components/Divider";
import SubmissionsListItem, { ITEM_HEIGHT } from "./SubmissionsListItem";
import { WHITE } from "../../constants/Colors";
import { showError } from "../../../utils/toastUtils";

// class UnconnectedSubmissionsList extends Component {
//   static propTypes = {
//     submissions: PropTypes.array.isRequired,
//     loading: PropTypes.bool.isRequired,
//     refresh: PropTypes.func.isRequired,
//   };

//   componentDidMount() {
//     // if (!this.props.loading) {
//     //   this.props.refresh();
//     // }
//     this.props.refresh();
//   }

//   render() {
//     return (
//       <View style={{ flex: 1, backgroundColor: WHITE }}>
//         <FlatList
//           data={this.props.submissions}
//           keyExtractor={(item) => String(item.id)}
//           onRefresh={this.props.refresh}
//           refreshing={this.props.loading}
//           renderItem={({ item }) => (
//             <SubmissionsListItem rainwork={item} {...this.props} />
//           )}
//           ItemSeparatorComponent={Divider}
//           getItemLayout={(data, index) => ({
//             length: ITEM_HEIGHT,
//             offset: (ITEM_HEIGHT + DIVIDER_HEIGHT) * index,
//             index,
//           })}
//           initialNumToRender={Math.ceil(
//             Dimensions.get("window").height / ITEM_HEIGHT
//           )}
//           ListEmptyComponent={() => (
//             <View style={{ padding: 16 }}>
//               <Text>You have no submissions</Text>
//             </View>
//           )}
//         />
//       </View>
//     );
//   }
// }

const UnconnectedSubmissionsList = (props) => {
  useFocusEffect(
    useCallback(() => {
      props.refresh();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: WHITE }}>
      <FlatList
        data={props.submissions}
        keyExtractor={(item) => String(item.id)}
        onRefresh={props.refresh}
        refreshing={props.loading}
        renderItem={({ item }) => (
          <SubmissionsListItem rainwork={item} {...props} />
        )}
        ItemSeparatorComponent={Divider}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: (ITEM_HEIGHT + DIVIDER_HEIGHT) * index,
          index,
        })}
        initialNumToRender={Math.ceil(
          Dimensions.get("window").height / ITEM_HEIGHT
        )}
        ListEmptyComponent={() => (
          <View style={{ padding: 16 }}>
            <Text>You have no submissions</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ({ navigation }) => (
  <SubmissionsConsumer>
    {({ submissions, loading, refresh }) => (
      <UnconnectedSubmissionsList
        submissions={submissions}
        loading={loading}
        refresh={refresh}
        navigation={navigation}
      />
    )}
  </SubmissionsConsumer>
);
