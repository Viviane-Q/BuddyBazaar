import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = ({
  label,
  placeholder,
  nativeID,
  items,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        label={label}
        placeholder={placeholder}
        style={styles.picker}
        nativeID={nativeID}
        onValueChange={onValueChange}
        selectedValue={selectedValue}
      >
        <Picker.Item key={-1} label='Sélectionnez une catégorie' value="" />
        {items.map((value, key) => (
          <Picker.Item label={value} value={value} key={key} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.outline,
    overflow: 'hidden',
    marginVertical: 10,
  },
  picker: {
    backgroundColor: theme.colors.primaryContainer,
    height: 48,
    padding: 12,
    fontSize: 16,
  },
});

export default CustomPicker;
