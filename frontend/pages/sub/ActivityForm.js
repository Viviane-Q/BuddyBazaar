import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import { Button, TextInput, Snackbar, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  postNewActivity,
  updateActivity,
} from '../../store/thunks/activitiesThunk';
import Category from '../../entities/Category';
import theme from '../../theme';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Autocomplete from '../../components/shared/form/Autocomplete';
import { checkAddress } from '../../store/thunks/franceAPIThunk';
import CustomPicker from '../../components/shared/form/CustomPicker';
import DateTimePicker from '../../components/shared/form/DateTimePicker';
import { setSelectedActivity } from '../../store/slices/activitiesSlice';


const ActivityForm = ({ navigation, route }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState(
    'Une erreur est survenue'
  );
  const selectedActivity = useSelector((state) => state.activities.selectedActivity);
  const isUpdate = route?.params?.isUpdate;
  const today = isUpdate
    ? new Date(selectedActivity.startDate)
      .toLocaleDateString('fr-FR')
      .split('/')
      .join('-')
      .replaceAll('-', '/')
    : new Date()
      .toLocaleDateString('fr-FR')
      .split('/')
      .join('-')
      .replaceAll('-', '/');
  const time = isUpdate
    ? new Date(selectedActivity.endDate)
      .toLocaleTimeString('fr-FR', { hour12: false })
      .slice(0, -3)
    : new Date().toLocaleTimeString('fr-FR', { hour12: false }).slice(0, -3);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [startTime, setStartTime] = useState(time);
  const [endDate, setEndDate] = useState(today);
  const [endTime, setEndTime] = useState(time);
  const [numberPersonMax, setNumberPersonMax] = useState(1);
  const [cost, setCost] = useState('0');
  const [place, setPlace] = useState({ label: '', coordinates: [0, 0] });
  const [category, setCategory] = useState(Category.Sport);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLabel, setSuggestionsLabel] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    initActivity();
  }, []);

  const getSuggestions = (address) => {
    if (address.trim().length >= 3) {
      const res = dispatch(checkAddress({ address }));
      res.then((data) => {
        if (!data.payload || data.payload.error) {
          setSnackbarVisible(true);
          setSnackbarType('error');
          setSnackbarMessage(data.payload.message);
          return;
        }
        let i = 0;
        setSuggestionsLabel(data.payload.res.map((suggestion) => ({ id: i++, title: suggestion.label })));
        setSuggestions(data.payload.res);
      });
    }
  };

  const initActivity = () => {
    if (isUpdate) {
      setTitle(selectedActivity.title);
      setDescription(selectedActivity.description);
      setStartDate(
        new Date(selectedActivity.startDate)
          .toLocaleDateString('fr-FR')
          .split('/')
          .join('-')
          .replaceAll('-', '/')
      );
      setEndDate(
        new Date(selectedActivity.endDate)
          .toLocaleDateString('fr-FR')
          .split('/')
          .join('-')
          .replaceAll('-', '/')
      );
      setStartTime(
        new Date(selectedActivity.startDate)
          .toLocaleTimeString('fr-FR', { hour12: false })
          .slice(0, -3)
      );
      setEndTime(
        new Date(selectedActivity.endDate)
          .toLocaleTimeString('fr-FR', { hour12: false })
          .slice(0, -3)
      );
      setNumberPersonMax(selectedActivity.numberPersonMax);
      setCost(selectedActivity.cost);
      setPlace({
        label: selectedActivity.place,
        coordinates: [selectedActivity.longitude, selectedActivity.latitude],
      });
      setSuggestions([{ label: selectedActivity.place, coordinates: [selectedActivity.longitude, selectedActivity.latitude] }]);
      setSuggestionsLabel([{ id: 0, title: selectedActivity.place }]);
      setCategory(selectedActivity.category);
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
    setPlace({ label: '', coordinates: [0, 0] });
    setCategory(Category.Sport);
  };

  const sendActivity = () => {
    // check if startTime is a valid time
    const regexTime = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const regexDate =
      /^([0-2][1-9]|3[0-1])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
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
      activity.cost == null ||
      !activity.place ||
      !activity.category
    ) {
      setSnackbarVisible(true);
      setSnackbarType('error');
      setSnackbarMessage('Tous les champs doivent être remplis');
      return;
    }
    if (activity.startDate > activity.endDate) {
      setSnackbarVisible(true);
      setSnackbarType('error');
      setSnackbarMessage('La date de début doit être avant la date de fin');
      return;
    }
    const res = isUpdate
      ? dispatch(
        updateActivity({
          activity: { id: selectedActivity.id, ...activity },
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
      dispatch(setSelectedActivity({
        ...selectedActivity,
        ...activity,
        startDate: startDateToSend.toISOString(),
        endDate: endDateToSend.toISOString(),
      }));
      resetForm();
      navigation.goBack();
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
        <DateTimePicker
          {...{
            defaultStartDate: today,
            defaultStartTime: time,
            defaultEndDate: today,
            defaultEndTime: time,
            setStartDate,
            setStartTime,
            setEndDate,
            setEndTime,
          }}
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
        {
          Platform.OS === "web" &&
          <Autocomplete
            value={place.label}
            style={[styles.textInput]}
            setFormValue={setPlace}
            containerStyle={{}}
            cypressID="placeInput"
            label="Lieu"
            data={suggestions}
            menuStyle={{ backgroundColor: 'white' }}
            onChange={getSuggestions}
          />
        }
        {
          Platform.OS !== "web" &&
          <AutocompleteDropdown
            onChangeText={getSuggestions}
            dataSet={suggestionsLabel}
            cypressID="placeInput"
            inputContainerStyle={{ backgroundColor: theme.colors.primaryContainer, borderRadius: 5, borderWidth: 1, borderColor: 'grey' }}
            onSelectItem={(item) => {
              setPlace({ label: item?.title, coordinates: suggestions.find((suggestion) => suggestion.label === item?.title)?.coordinates });
            }}
            useFilter={false} // set false to prevent rerender twice
            closeOnBlur={true}
            EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>Aucun résultat</Text>}
            containerStyle={{ flexGrow: 1, flexShrink: 1 }}
            inputHeight={50}
            showChevron={true}
            textInputProps={{
              placeholder: place.label ?? "Lieu",
              placeholderTextColor: '#000'
            }}
          />
        }
        <CustomPicker
          label={'Catégorie'}
          placeholder={'Catégorie'}
          nativeID={'categoryInput'}
          items={Object.values(Category)}
          selectedValue={category}
          onValueChange={setCategory}
        />
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
    paddingHorizontal: 30,
  },
  textInput: {
    backgroundColor: theme.colors.primaryContainer,
    marginVertical: 10,
  },
  error: {
    backgroundColor: '#e35d6a',
  },
  success: {
    backgroundColor: '#479f76',
  },
});

export default ActivityForm;
