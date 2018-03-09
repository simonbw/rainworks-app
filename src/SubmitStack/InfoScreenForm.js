import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { COMMON_DATE_FORMAT } from '../util';
import { SubmissionConsumer } from './SubmissionContext';

export const TitleInput = ({ inputRef }) => (
  <SubmissionConsumer>
    {({ submitting, name, setName }) => (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Rainwork Title</Text>
        <TextInput
          disabled={submitting}
          onChangeText={setName}
          ref={inputRef}
          style={styles.textInput}
          value={name}
        />
      </View>
    )}
  </SubmissionConsumer>
);

export const InstallationDateInput = () => (
  <SubmissionConsumer>
    {({ submitting, installationDate, setInstallationDate }) => (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Installation Date</Text>
        <DatePicker
          cancelBtnText={'Cancel'}
          confirmBtnText={'OK'}
          customStyles={{
            dateInput: styles.dateInput,
            dateText: styles.dateText,
            btnTextConfirm: styles.btnTextConfirm,
          }}
          disabled={submitting}
          date={installationDate}
          format={COMMON_DATE_FORMAT}
          mode={'date'}
          onDateChange={(d) => setInstallationDate(d)}
          showIcon={false}
          style={styles.datePicker}
        />
      </View>
    )}
  </SubmissionConsumer>
);

export const CreatorInput = () => (
  <SubmissionConsumer>
    {({ submitting, creatorName, setCreatorName }) => (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Creator (optional)</Text>
        <TextInput
          disabled={submitting}
          onChangeText={setCreatorName}
          style={styles.textInput}
          value={creatorName}
        />
      </View>
    )}
  </SubmissionConsumer>
);

export const DescriptionInput = () => (
  <SubmissionConsumer>
    {({ submitting, description, setDescription }) => (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          autogrow
          blurOnSubmit
          disabled={submitting}
          multiline
          onChangeText={setDescription}
          style={[styles.textInput, styles.multiline]}
          value={description}
        />
      </View>
    )}
  </SubmissionConsumer>
);

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '200'
  },
  textInput: {
    fontSize: 20,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: '#BBB'
  },
  multiline: {},
  datePicker: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: '#BBB',
  },
  dateInput: {
    borderWidth: 0,
    // justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: 20,
  },
  btnTextConfirm: {
    color: '#007aff',
  },
});