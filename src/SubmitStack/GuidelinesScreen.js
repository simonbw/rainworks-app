import { Button, Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Link from '../Link';
import { LOCATION_SELECT_SCREEN } from './index';

const BulletPoint = ({ children }) => (
  <Text style={styles.bulletPoint}>• {children}</Text>
);

const GuidelinesScreen = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <View style={styles.contentContainer}>
      <Text style={styles.paragraph}>
        Before you can submit a rainwork location to the map, you must make a rainwork. You can learn how
        at <Link url={'https://www.rain.works/how'}>www.rain.works/how</Link>.
      </Text>
      <Text style={styles.paragraph}>
        The purpose of rainworks is to make rainy days something to look forward to.
        For that reason we have the following rules:
      </Text>
      <View style={styles.bulletList}>
        <BulletPoint>No blatant advertising or promotions</BulletPoint>
        <BulletPoint>No profanity or offensive imagery</BulletPoint>
        <BulletPoint>No political affiliations</BulletPoint>
        <BulletPoint>No hashtags, logos, or addresses</BulletPoint>
      </View>
      <Text style={styles.paragraph}>
        The rainworks team reserves the right to refuse any submission to the map.
        Remember, the goal is to make people look forward to rainy days!
      </Text>
    </View>
    <View>
      <Button
        transparent
        onPress={() => navigation.navigate(LOCATION_SELECT_SCREEN)}
        style={{ position: 'absolute', bottom: 12, right: 12 }}
      >
        <Text>I Understand</Text>
      </Button>
    </View>
  </View>
);

GuidelinesScreen.navigationOptions = {
  title: 'Submission Guidelines'
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
    flex: 1,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
  },
  bulletList: {
    marginBottom: 12,
    paddingLeft: 12,
  },
  bulletPoint: {
    fontSize: 16,
  },
});

export default GuidelinesScreen;