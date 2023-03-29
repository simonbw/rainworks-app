import { Text, View } from "native-base";
import React, { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import DatePicker from "react-native-datepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ACTION_COLOR, GRAY } from "../../constants/Colors";
import { COMMON_DATE_FORMAT } from "../../../utils/util";
import { SubmissionConsumer } from "../Submit/SubmissionContext";
import moment from "moment";

export const TitleInput = ({ inputRef }) => (
  <SubmissionConsumer>
    {({ submitting, name, setName }) => {
      return (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rainwork Title</Text>
          <TextInput
            disabled={submitting}
            onChangeText={setName}
            ref={inputRef}
            style={styles.textInput}
            value={name}
            returnKeyType="done"
          />
        </View>
      );
    }}
  </SubmissionConsumer>
);

export const InstallationDateInput = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <SubmissionConsumer>
      {({ submitting, installationDate, setInstallationDate }) => (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Installation Date</Text>
          {/* <DatePicker
            cancelBtnText={"Cancel"}
            confirmBtnText={"OK"}
            customStyles={{
              dateInput: styles.dateInput,
              dateText: styles.dateText,
              btnTextConfirm: styles.btnTextConfirm,
              btnTextCancel: styles.btnTextCancel,
            }}
            date={installationDate}
            disabled={submitting}
            format={COMMON_DATE_FORMAT}
            maxDate={new Date()}
            mode={"date"}
            onDateChange={(d) => setInstallationDate(d)}
            showIcon={false}
            style={styles.datePicker}
          /> */}
          <Pressable style={[styles.textInput]} onPress={showDatePicker}>
            <Text style={styles.dateText}>
              {installationDate
                ? moment(installationDate).format(COMMON_DATE_FORMAT)
                : ""}
            </Text>
          </Pressable>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            date={installationDate ? new Date(installationDate) : new Date()}
            // minimumDate={new Date()}
            onConfirm={(date) => {
              setInstallationDate(date);
              hideDatePicker();
            }}
            onCancel={hideDatePicker}
          />
        </View>
      )}
    </SubmissionConsumer>
  );
};

export const EmailInput = () => (
  <SubmissionConsumer>
    {({ submitting, creatorEmail, setCreatorEmail }) => (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Email (if we need to contact you about your rainwork)
        </Text>
        <TextInput
          disabled={submitting}
          onChangeText={setCreatorEmail}
          style={styles.textInput}
          value={creatorEmail}
          keyboardType="email-address"
          returnKeyType="done"
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
          returnKeyType="done"
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
    fontWeight: "200",
  },
  textInput: {
    fontSize: 20,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: GRAY,
  },
  multiline: {},
  datePicker: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: GRAY,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: "flex-start",
  },
  dateText: {
    fontSize: 20,
  },
  btnTextConfirm: {
    height: 20,
    color: ACTION_COLOR,
  },
  btnTextCancel: {
    height: 20,
  },
});
