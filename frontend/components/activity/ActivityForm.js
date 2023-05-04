import React, { useState } from 'react';
import { View, StyleSheet, Picker } from 'react-native';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useDispatch } from 'react-redux';
import { postNewActivity } from '../../store/thunks/activitiesThunk';
import Category from '../../entities/Category';

const ActivityForm = ({ navigation }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState(
    'Une erreur est survenue'
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [numberPersonMax, setNumberPersonMax] = useState(1);
  const [cost, setCost] = useState('0');
  const [place, setPlace] = useState('');
  const [category, setCategory] = useState(Category.Sport);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setStartDate(startDate);
      setEndDate(endDate);
    },
    [setOpen, setStartDate, setEndDate]
  );
  const onNumberPersonMaxChange = (text) => {
    text = text.replace(/[^0-9]/g, '');
    if (text < 1) text = 1;
    setNumberPersonMax(text);
  };
  const onCostChange = (text) => {
    text = text.replace(/[^0-9]/g, '');
    if (text < 0) text = 0;
    setCost(text);
  };
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate();
    setEndDate();
    setNumberPersonMax(1);
    setCost('0');
    setPlace('');
    setCategory(Category.Sport);
  };

  const sendActivity = () => {
    const activity = {
      title,
      description,
      startDate,
      endDate,
      numberPersonMax,
      cost,
      place,
      category,
    };
    if (
      !activity.title ||
      !activity.description ||
      !activity.startDate ||
      !activity.endDate ||
      !activity.numberPersonMax ||
      !activity.cost ||
      !activity.place ||
      !activity.category
    ) {
      setSnackbarVisible(true);
      setSnackbarType('error');
      setSnackbarMessage('Tous les champs doivent être remplis');
      return;
    }
    const res = dispatch(postNewActivity({ activity }));
    res.then((res) => {
      if (!res.payload) {
        setSnackbarVisible(true);
        setSnackbarType('error');
        setSnackbarMessage('Une erreur est survenue');
        return;
      }
      if (res.payload.error) {
        setSnackbarVisible(true);
        setSnackbarType('error');
        setSnackbarMessage("L'adresse email ou le mot de passe est incorrect");
        return;
      }
      resetForm();
      navigation.navigate('Home');
    });
  };

  return (
    <View style={styles.newActivityForm}>
      <TextInput
        label="Titre"
        placeholder="Titre"
        onChangeText={setTitle}
        value={title}
        style={styles.textInput}
        nativeID='titleInput'
      />
      <TextInput
        label="Description"
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
        multiline={true}
        numberOfLines={4}
        style={styles.textInput}
        nativeID='descriptionInput'
      />
      <Button
        onPress={() => setOpen(true)}
        uppercase={false}
        mode="outlined"
        icon="calendar"
        nativeID='datePickerButton'
      >
        {!!startDate && !!endDate
          ? `${startDate.toLocaleDateString(
              'fr-FR'
            )} - ${endDate.toLocaleDateString('fr-FR')}`
          : 'Choissisez une date'}
      </Button>
      <DatePickerModal
        locale="fr"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={startDate}
        endDate={endDate}
        onConfirm={onConfirm}
        saveLabel="Confirmer"
        startLabel="Début"
        endLabel="Fin"
        label="Sélectionnez deux dates"
        style={styles.textInput}
      />
      <TextInput
        label="Nombre de participants maximum"
        placeholder="Nombre de participants maximum"
        keyboardType="numeric"
        onChangeText={onNumberPersonMaxChange}
        value={numberPersonMax}
        style={styles.textInput}
        nativeID='numberPersonMaxInput'
      />
      <TextInput
        label="Coût"
        placeholder="Coût"
        keyboardType="numeric"
        onChangeText={onCostChange}
        value={cost}
        style={styles.textInput}
        nativeID='costInput'
      />
      <TextInput
        label="Lieu"
        placeholder="Lieu"
        onChangeText={setPlace}
        value={place}
        style={styles.textInput}
        nativeID='placeInput'
      />
      <Picker
        label="Catégorie"
        placeholder="Catégorie"
        onValueChange={setCategory}
        selectedValue={category}
        style={styles.textInput}
        nativeID='categoryPicker'
      >
        {Object.values(Category).map((category, key) => (
          <Picker.Item label={category} value={category} key={key} />
        ))}
      </Picker>
      <View style={styles.modalButtonsContainer}>
        <Button onPress={sendActivity} mode="contained" icon="check" nativeID='validateButtonNewActivity'>
          Valider
        </Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        style={snackbarType === 'error' ? styles.error : styles.success}
        action={{
          label: '⨯',
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  newActivityForm: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    height: 'fit-content',
  },
  textInput: {
    margin: 10,
  },
  error: {
    backgroundColor: '#e35d6a',
  },
  success: {
    backgroundColor: '#479f76',
  },
});

export default ActivityForm;
