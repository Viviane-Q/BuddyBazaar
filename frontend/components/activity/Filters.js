import React from 'react';
import { View, StyleSheet } from 'react-native';
import Category from '../../entities/Category';
import CustomPicker from '../shared/form/CustomPicker';
import theme from '../../theme';
import DateTimePicker from '../shared/form/DateTimePicker';
import { TextInput } from 'react-native-paper';

const Filters = ({
  setStartDate,
  setStartTime,
  setEndDate,
  setEndTime,
  category,
  setCategory,
  numberPersonMax,
  setNumberPersonMax,
  cost,
  setCost,
}) => {
  const today = new Date()
    .toLocaleDateString('fr-FR')
    .split('/')
    .join('-')
    .replaceAll('-', '/');
  const time = new Date()
    .toLocaleTimeString('fr-FR', { hour12: false })
    .slice(0, -3);

  return (
    <View>
      <DateTimePicker
        {...{
          defaultStartDate: today,
          defaultStartTime: time,
          setStartDate,
          setStartTime,
          setEndDate,
          setEndTime,
        }}
      />
      <TextInput
        label="Nombre de participants maximum"
        placeholder="Nombre de participants maximum"
        value={numberPersonMax}
        onChangeText={setNumberPersonMax}
        keyboardType="numeric"
        style={styles.textInput}
        nativeID="numberPersonMaxInput"
        mode="outlined"
      />
      <TextInput
        label="Coût maximum"
        placeholder="Coût maximum"
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
        style={styles.textInput}
        nativeID="costInput"
        mode="outlined"
      />
      <CustomPicker
        label="Catégorie"
        placeholder="Catégorie"
        nativeID="categoryInput"
        items={Object.values(Category)}
        selectedValue={category}
        onValueChange={setCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: theme.colors.primaryContainer,
    marginVertical: 10,
  },
});

export default Filters;
