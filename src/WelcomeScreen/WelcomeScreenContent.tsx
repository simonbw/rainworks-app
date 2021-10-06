import { Text, View } from "native-base";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ACTION_COLOR } from "../constants/Colors";
import Link from "../Common/Link";

const WelcomeScreenContent = ({ close }) => (
  <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    alwaysBounceVertical={false}
  >
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Rainworks App!</Text>
      <Text style={styles.paragraph}>
        A <Text style={{ fontStyle: "italic" }}>rainwork</Text> is a piece of
        street art that only appears when it gets wet. Their purpose is to make
        people look forward to rainy days.
      </Text>
      <Text style={styles.paragraph}>
        Anybody can create a rainwork and add it to the map. Use this app to
        find rainworks near you, and submit rainworks you’ve made!
      </Text>
      <Text style={styles.paragraph}>
        This app works best with location services turned on.
      </Text>
      <Text style={styles.paragraph}>
        For more information and to learn how to make rainworks, please visit{" "}
        <Link url={"https://www.rain.works"}>www.rain.works</Link>.
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity transparent onPress={close}>
          <Text style={{ color: ACTION_COLOR }}>Let's Get Started!</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 16 * 3
  },
  header: {
    paddingBottom: 12,
    fontWeight: "bold",
    textAlign: "center"
  },
  paragraph: {
    fontSize: 16,
    paddingBottom: 12,
    textAlign: "justify"
  }
});

export default WelcomeScreenContent;
