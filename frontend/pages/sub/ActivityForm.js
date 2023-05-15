import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { MaskedTextInput } from "react-native-mask-text";
import { useDispatch } from 'react-redux';
import {
  postNewActivity,
  updateActivity,
} from '../../store/thunks/activitiesThunk';
import Category from '../../entities/Category';
import theme from '../../theme';
import Autocomplete from '../../components/shared/form/Autocomplete';
import { checkAddress } from '../../store/thunks/franceAPIThunk';

// get current date and time without seconds

const ActivityForm = ({ navigation, route }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState(
    'Une erreur est survenue'
  );
  const isUpdate = route?.params?.activity?.id;
  const today = isUpdate ? new Date(route.params.activity.startDate).toLocaleDateString('fr-FR').split('/').join('-').replaceAll('-','/'):new Date().toLocaleDateString('fr-FR').split('/').join('-').replaceAll('-', '/');
  const time = isUpdate ? new Date(route.params.activity.endDate).toLocaleTimeString('fr-FR', { hour12: false }).slice(0, -3):new Date().toLocaleTimeString('fr-FR', { hour12: false }).slice(0, -3);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [startTime, setStartTime] = useState(time);
  const [endDate, setEndDate] = useState(today);
  const [endTime, setEndTime] = useState(time);
  const [numberPersonMax, setNumberPersonMax] = useState(1);
  const [cost, setCost] = useState('0');
  const [place, setPlace] = useState({'label': '', 'coordinates': [0,0]});
  const [category, setCategory] = useState(Category.Sport);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    initActivity();
  }, []);

  const getSuggestions = (address) => {
    if(address.trim().length >= 3) {
      const res = dispatch(checkAddress({ address }))
      res.then((data) => {
        if(!data.payload || data.payload.error) {
          setSnackbarVisible(true);
          setSnackbarType('error');
          setSnackbarMessage(data.payload.message);
          return;
        }
        setSuggestions(data.payload.res);
      });
    }
  }
    
  const initActivity = () => {
    if (isUpdate) {
      const activity = route.params.activity;
      setTitle(activity.title);
      setDescription(activity.description);
      setStartDate(new Date(activity.startDate).toLocaleDateString('fr-FR').split('/').join('-').replaceAll('-', '/'));
      setEndDate(new Date(activity.endDate).toLocaleDateString('fr-FR').split('/').join('-').replaceAll('-', '/'));
      setStartTime(new Date(activity.startDate).toLocaleTimeString('fr-FR', { hour12: false }).slice(0, -3));
      setEndTime(new Date(activity.endDate).toLocaleTimeString('fr-FR', { hour12: false }).slice(0, -3));
      setNumberPersonMax(activity.numberPersonMax);
      setCost(activity.cost);
      setPlace({label: activity.place, coordinates: [activity.longitude, activity.latitude]});
      setCategory(activity.category);
    }
  };

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
    setStartDate(today);
    setStartTime(time);
    setEndDate(today);
    setEndTime(time);
    setNumberPersonMax(1);
    setCost('0');
    setPlace({'label': '', 'coordinates': [0,0]});
    setCategory(Category.Sport);
  };

  const sendActivity = () => {
    // check if startTime is a valid time
    const regexTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const regexDate = /^([0-2][1-9]|3[0-1])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
    if (!regexTime.test(startTime) || !regexTime.test(endTime)) {
      setSnackbarVisible(true);
      setSnackbarType('error');
      setSnackbarMessage('Heure invalide');
      return;
    }
    if (!regexDate.test(startDate) || !regexDate.test(endDate)) {
      setSnackbarVisible(true);
      setSnackbarType('error');
      setSnackbarMessage('Date invalide');
        return;
    }
    const startDateToSend = new Date();
    startDateToSend.setFullYear(startDate.split('/')[2]);
    startDateToSend.setMonth(startDate.split('/')[1] - 1);
    startDateToSend.setDate(startDate.split('/')[0]);
    startDateToSend.setHours(parseInt(startTime.split(':')[0]));
    startDateToSend.setMinutes(parseInt(startTime.split(':')[1]));
    const endDateToSend = new Date();
    endDateToSend.setFullYear(endDate.split('/')[2]);
    endDateToSend.setMonth(endDate.split('/')[1] - 1);
    endDateToSend.setDate(endDate.split('/')[0]);
    endDateToSend.setHours(parseInt(endTime.split(':')[0]));
    endDateToSend.setMinutes(parseInt(endTime.split(':')[1]));
    const activity = {
      title,
      description,
      startDate: startDateToSend,
      endDate: endDateToSend,
      numberPersonMax,
      cost,
      place: place.label,
      longitude: place.coordinates[0],
      latitude: place.coordinates[1],
      category,
    };
    if (
      !activity.title ||
      !activity.description ||
      !activity.startDate ||
      !activity.endDate ||
      !activity.numberPersonMax ||
      activity.cost==null ||
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
      navigation.navigate('MyActivities');
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.newActivityForm}>
        <TextInput
          label="Titre"
          placeholder="Titre"
          onChangeText={setTitle}
          value={title}
          style={styles.textInput}
          nativeID="titleInput"
          mode="outlined"
          onSubmitEditing={sendActivity}
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
          onSubmitEditing={sendActivity}
        />
        <View style={styles.dateContainer}>
          <View style={styles.datePickerRow}>
            <View style={styles.datePickerContainer}>
              <Text>Date de début</Text>
              <MaskedTextInput
                placeholder="JJ/MM/AAAA"
                mask="99/99/9999"
                onChangeText={setStartDate}
                defaultValue={today}
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
                defaultValue={time}
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
                defaultValue={today}
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
                defaultValue={time}
                style={styles.dateInput}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        <TextInput
          label="Nombre de participants maximum"
          placeholder="Nombre de participants maximum"
          keyboardType="numeric"
          onChangeText={onNumberPersonMaxChange}
          value={numberPersonMax.toString()}
          style={styles.textInput}
          nativeID="numberPersonMaxInput"
          mode="outlined"
          onSubmitEditing={sendActivity}
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
          onSubmitEditing={sendActivity}
        />
        <Autocomplete
            value={place.label}
            style={[styles.textInput]}
            setFormValue={setPlace}
            containerStyle={{}}
            cypressID="placeInput"
            label="Lieu"
            data={suggestions}
            menuStyle={{backgroundColor: 'white'}}
            onChange={getSuggestions}
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
        <View style={{ height: 100 }}></View>
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
    flexGrow: 1,
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
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 30,
  },
  error: {
    backgroundColor: '#e35d6a',
  },
  success: {
    backgroundColor: '#479f76',
  },
});

export default ActivityForm;
