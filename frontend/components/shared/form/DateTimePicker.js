import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import { MaskedTextInput } from 'react-native-mask-text';
import { Text } from 'react-native-paper';

const DateTimePicker = ({
  defaultStartDate,
  defaultStartTime,
  defaultEndDate,
  defaultEndTime,
  setStartDate,
  setStartTime,
  setEndDate,
  setEndTime,
}) => {
  return (
    <View>
      <View style={styles.datePickerRow}>
        <View style={styles.datePickerContainer}>
          <Text>Date de début</Text>
          <MaskedTextInput
            placeholder="JJ/MM/AAAA"
            mask="99/99/9999"
            onChangeText={setStartDate}
            defaultValue={defaultStartDate}
            style={styles.dateInput}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.datePickerContainer}>
          <Text>Heure de début</Text>
          <MaskedTextInput
            placeholder="hh:mm"
            mask="99:99"
            onChangeText={setStartTime}
            defaultValue={defaultStartTime}
            style={styles.dateInput}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.datePickerRow}>
        <View style={styles.datePickerContainer}>
          <Text>Date de fin</Text>
          <MaskedTextInput
            placeholder="JJ/MM/AAAA"
            mask="99/99/9999"
            onChangeText={setEndDate}
            defaultValue={defaultEndDate}
            style={styles.dateInput}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.datePickerContainer}>
          <Text>Heure de fin</Text>
          <MaskedTextInput
            placeholder="hh:mm"
            mask="99:99"
            onChangeText={setEndTime}
            defaultValue={defaultEndTime}
            style={styles.dateInput}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    margin: 0,
  },
  datePickerContainer: {
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 4,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.outline,
    overflow: 'hidden',
    width: '45%',
    flex: 1,
  },
  datePickerRow: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 14,
  },
});

export default DateTimePicker;
