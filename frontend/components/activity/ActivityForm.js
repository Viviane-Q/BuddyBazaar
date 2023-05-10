import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useDispatch } from 'react-redux';
import {
  postNewActivity,
  updateActivity,
} from '../../store/thunks/activitiesThunk';
import Category from '../../entities/Category';
import theme from '../../theme';

const ActivityForm = ({ navigation, route }) => {
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
  const isUpdate = route?.params?.activity?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    initActivity();
  }, []);

  const initActivity = () => {
    if (isUpdate) {
      const activity = route.params.activity;
      setTitle(activity.title);
      setDescription(activity.description);
      setStartDate(new Date(activity.startDate));
      setEndDate(new Date(activity.endDate));
      setNumberPersonMax(activity.numberPersonMax);
      setCost(activity.cost);
      setPlace(activity.place);
      setCategory(activity.category);
    }
  };

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
    setNumberPersonMax(text);
  };
  const onCostChange = (text) => {
    text = text.replace(/[^0-9]/g, '');
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
    const res = isUpdate
      ? dispatch(
          updateActivity({
            activity: { id: route.params.activity.id, ...activity },
          })
        )
      : dispatch(postNewActivity({ activity }));
    res.then((res) => {
      if (!res.payload || res.payload.error) {
        setSnackbarVisible(true);
        setSnackbarType('error');
        setSnackbarMessage('Une erreur est survenue');
        return;
      }
      resetForm();
      navigation.navigate('Home');
    });
  };

  return (
    <View style={{flex: 1}}>
    <ScrollView style={styles.newActivityForm}>
      <TextInput
        label="Titre"
        placeholder="Titre"
        onChangeText={setTitle}
        value={title}
        style={styles.textInput}
        nativeID="titleInput"
        mode="outlined"
      />
      <TextInput
        label="Description"
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
        multiline={true}
        numberOfLines={4}
        style={styles.textInput}
        nativeID="descriptionInput"
        mode="outlined"
      />
      <Button
        onPress={() => setOpen(true)}
        uppercase={false}
        mode="outlined"
        icon="calendar"
        nativeID="datePickerButton"
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
        value={numberPersonMax.toString()}
        style={styles.textInput}
        nativeID="numberPersonMaxInput"
        mode="outlined"
      />
      <TextInput
        label="Coût"
        placeholder="Coût"
        keyboardType="numeric"
        onChangeText={onCostChange}
        value={cost.toString()}
        style={styles.textInput}
        nativeID="costInput"
        mode="outlined"
      />
      <TextInput
        label="Lieu"
        placeholder="Lieu"
        onChangeText={setPlace}
        value={place}
        style={styles.textInput}
        nativeID="placeInput"
        mode="outlined"
      />
      <View style={styles.pickerContainer}>
        <Picker
          label="Catégorie"
          placeholder="Catégorie"
          onValueChange={setCategory}
          selectedValue={category}
          style={styles.picker}
          nativeID="categoryPicker"
        >
          {Object.values(Category).map((category, key) => (
            <Picker.Item label={category} value={category} key={key} />
          ))}
        </Picker>
      </View>
      <View style={styles.modalButtonsContainer}>
        <Button
          onPress={sendActivity}
          mode="contained"
          icon="check"
          nativeID="validateButtonNewActivity"
        >
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
      <View style={{height: 100}}></View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  newActivityForm: {
    backgroundColor: theme.colors.background,
    flexGrow: 1 ,
  },
  textInput: {
    backgroundColor: theme.colors.primaryContainer,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  picker: {
    backgroundColor: theme.colors.primaryContainer,
  },
  pickerContainer: {
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.outline,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 31,
  },
  error: {
    backgroundColor: '#e35d6a',
  },
  success: {
    backgroundColor: '#479f76',
  },
});

export default ActivityForm;
