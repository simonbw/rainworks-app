import { Text, View } from "native-base";
import React, { useEffect } from "react";
import { Dimensions, FlatList } from "react-native";
import Divider, { DIVIDER_HEIGHT } from "../Common/Divider";
import { useSubmissionsContext } from "../contexts/SubmissionsContext";
import SubmissionsListItem, { ITEM_HEIGHT } from "./SubmissionsListItem";

export default function SubmissionsList() {
  const { submissions, loading, refresh } = useSubmissionsContext();
  useEffect(() => refresh());

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={submissions}
        keyExtractor={item => String(item.id)}
        onRefresh={refresh}
        refreshing={loading}
        renderItem={({ item }) => <SubmissionsListItem rainwork={item} />}
        ItemSeparatorComponent={Divider}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: (ITEM_HEIGHT + DIVIDER_HEIGHT) * index,
          index
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
}
