import { Text, View } from "native-base";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { WHITE } from "../../constants/Colors";
import Link from "../../components/Link";

const AboutScreen = () => (
  <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        A “rainwork” is a piece of street art that only appears when it gets
        wet. Their purpose is to make people look forward to rainy days.
      </Text>
      <Text style={styles.paragraph}>
        Anybody can create a rainwork and add it to the map. Use this app to
        find rainworks near you, and submit rainworks you’ve made!
      </Text>
      <Text style={styles.paragraph}>
        When you're within range of a rainwork, you can mark it as "Found!" to
        let the creator know you've visited their work.
      </Text>
      <Text style={styles.paragraph}>
        Rainworks are temporary, lasting 2-4 months on average. Rainworks are
        most vivid for the first few weeks, and they gradually fade over time.
        Because of this, the map is constantly changing, as new rainworks are
        created and old rainworks fade away.
      </Text>
      <Text style={styles.paragraph}>
        If you come across a rainwork that is severely faded or vanished
        entirely, please report the rainwork so we can update it's status. This
        user-based reporting system helps us keep this app up-to-date.
      </Text>
      <Text style={styles.paragraph}>
        This app works best with location services turned on.
      </Text>
      <Text style={styles.paragraph}>
        For more information and to learn how to make rainworks, please visit{" "}
        <Link url={"https://www.rain.works"}>www.rain.works</Link>.
      </Text>
      <Text style={styles.paragraph}>
        For help & support, email us at{" "}
        <Link url={"mailto:contact@rain.works"}>contact@rain.works</Link>.
      </Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: WHITE,
  },
  paragraph: {
    paddingBottom: 12,
  },
});

export default AboutScreen;
