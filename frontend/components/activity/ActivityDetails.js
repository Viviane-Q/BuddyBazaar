import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TitleMedium from '../shared/typography/TitleMedium';
import BodyMedium from '../shared/typography/BodyMedium';
import { Button, Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { deleteActivity } from '../../store/thunks/activitiesThunk';

const ActivityDetails = ({ navigation, route }) => {
  const { activity } = route.params;
  const dispatch = useDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState(
    'Une erreur est survenue'
  );
  const startDate = `${new Date(activity.startDate).toLocaleDateString(
    'fr-FR'
  )} ${new Date(activity.startDate).toLocaleTimeString('fr-FR')}`;
  const endDate = `${new Date(activity.endDate).toLocaleDateString(
    'fr-FR'
  )} ${new Date(activity.endDate).toLocaleTimeString('fr-FR')}`;

  const deleteActivityHandler = () => {
    const res = dispatch(
      deleteActivity({
        id: activity.id,
      })
    );
    res.then((res) => {
      if (!res.payload || res.payload.error) {
        setSnackbarVisible(true);
        setSnackbarType('error');
        setSnackbarMessage('Une erreur est survenue');
        return;
      }
      navigation.navigate('Home');
    });
  };

  const editActivityHandler = () => {
    navigation.navigate('ActivityForm', { activity });
  };

  return (
    <View>
      <TitleMedium>{activity.title}</TitleMedium>
      <BodyMedium>{activity.description}</BodyMedium>
      <BodyMedium>{activity.cost} €</BodyMedium>
      <BodyMedium>{activity.place}</BodyMedium>
      <BodyMedium>{startDate}</BodyMedium>
      <BodyMedium>{endDate}</BodyMedium>
      <BodyMedium>{activity.numberPersonMax}</BodyMedium>
      <BodyMedium>{activity.category}</BodyMedium>
      <Button
        onPress={editActivityHandler}
        mode="contained"
        icon="pencil-outline"
        nativeID="editActivityButton"
      >
        Modifier
      </Button>
      {
        // TODO: display buttons only if the user owns the activity
      }
      <Button
        onPress={deleteActivityHandler}
        mode="contained"
        icon="delete"
        nativeID="deleteActivityButton"
      >
        Supprimer
      </Button>
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
  error: {
    backgroundColor: '#e35d6a',
  },
  success: {
    backgroundColor: '#479f76',
  },
});

export default ActivityDetails;
