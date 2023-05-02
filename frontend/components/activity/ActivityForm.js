import React, { useState } from 'react';
import { View, StyleSheet, Picker } from 'react-native';
import { Button, Modal, Text, TextInput, Snackbar } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useDispatch } from 'react-redux';
import { postNewActivity } from '../../store/thunks/activitiesThunk';
import Category from '../../entities/Category';

const ActivityForm = ({ setModalVisible, modalVisible, refreshActivities }) => {
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
  const [cost, setCost] = useState(0);
  const [place, setPlace] = useState('');
  const [category, setCategory] = useState(Category.Sport);

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
      hideModal();
      refreshActivities();
    });
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      visible={modalVisible}
      style={styles.newActivityForm}
      onDismiss={hideModal}
    >
      <Text
        variant="titleLarge"
        style={{ textAlign: 'center', fontWeight: 'bold' }}
      >
        Nouvelle activité
      </Text>
      <TextInput
        label="Titre"
        placeholder="Titre"
        onChangeText={setTitle}
        value={title}
        style={styles.textInput}
      />
      <TextInput
        label="Description"
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
        multiline={true}
        numberOfLines={4}
        style={styles.textInput}
      />
      <Button
        onPress={() => setOpen(true)}
        uppercase={false}
        mode="outlined"
        icon="calendar"
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
      />
      <TextInput
        label="Coût"
        placeholder="Coût"
        keyboardType="numeric"
        onChangeText={onCostChange}
        value={cost}
        style={styles.textInput}
      />
      <TextInput
        label="Lieu"
        placeholder="Lieu"
        onChangeText={setPlace}
        value={place}
        style={styles.textInput}
      />
      <Picker
        label="Catégorie"
        placeholder="Catégorie"
        onValueChange={setCategory}
        selectedValue={category}
        style={styles.textInput}
      >
        {Object.values(Category).map((category, key) => (
          <Picker.Item label={category} value={category} key={key} />
        ))}
      </Picker>
      <View style={styles.modalButtonsContainer}>
        <Button onPress={hideModal} mode="outlined" icon="close">
          Annuler
        </Button>
        <Button onPress={sendActivity} mode="contained" icon="check">
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
    </Modal>
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
    marginTop: 100,
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
