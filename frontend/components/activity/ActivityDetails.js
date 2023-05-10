import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import TitleMedium from '../shared/typography/TitleMedium';
import BodyMedium from '../shared/typography/BodyMedium';
import { IconButton, Snackbar, Card, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteActivity } from '../../store/thunks/activitiesThunk';
import theme from '../../theme';
import TitleSmall from '../shared/typography/TitleSmall';

const ActivityDetails = ({ navigation, route }) => {
  const { activity } = route.params;
  const userId = useSelector((state) => state.auth.id);
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
    <Card style={styles.activityCard}>
      <View>
        <Image
          source={`https://picsum.photos/700?id=${activity.id}`}
          style={styles.cover}
        />
      </View>
      <Card.Content>
        <View style={{ gap: 16 }}>
          <View style={styles.titleContainer}>
            <TitleMedium style={{ color: theme.colors.primary }}>
              {activity.title}
            </TitleMedium>
            {userId === activity.userId && (
              <View style={styles.buttonsGroup}>
                <IconButton
                  icon="delete"
                  onPress={deleteActivityHandler}
                  nativeID="deleteActivityButton"
                  iconColor={theme.colors.secondary}
                  size={20}
                  style={styles.icon}
                />
                <IconButton
                  icon="pencil-outline"
                  onPress={editActivityHandler}
                  nativeID="editActivityButton"
                  iconColor={theme.colors.secondary}
                  size={20}
                  style={styles.icon}
                />
              </View>
            )}
          </View>
          <View
            style={{
              ...styles.categoryContainer,
              backgroundColor: theme.colors.categories[activity.category],
            }}
          >
            <BodyMedium style={{ color: 'white' }}>
              {activity.category}
            </BodyMedium>
          </View>
          <Divider
            style={{ backgroundColor: theme.colors.tertiaryContainer }}
          />
          <View>
            <TitleSmall style={{ fontWeight: 'bold' }}>Infos clés</TitleSmall>
            <BodyMedium style={{ fontWeight: 'bold' }}>
              Coût : {activity.cost} €
            </BodyMedium>
            <BodyMedium>Lieu : {activity.place}</BodyMedium>
            <BodyMedium>Début : {startDate}</BodyMedium>
            <BodyMedium>Fin : {endDate}</BodyMedium>
          </View>
          <Divider
            style={{ backgroundColor: theme.colors.tertiaryContainer }}
          />
          <View>
            <TitleSmall style={{ fontWeight: 'bold' }}>Description</TitleSmall>
            <BodyMedium>{activity.description}</BodyMedium>
          </View>
          <Divider
            style={{ backgroundColor: theme.colors.tertiaryContainer }}
          />
          <View style={styles.participantContainer}>
            <TitleSmall style={{ fontWeight: 'bold' }}>Participants</TitleSmall>
            <View style={styles.numberPersonContainer}>
              <IconButton
                icon="account-group"
                compact="true"
                style={styles.icon}
                iconColor={theme.colors.secondary}
                size={28}
              />
              <BodyMedium style={{ fontWeight: 'bold', fontSize: 18 }}>
                0/{activity.numberPersonMax}
              </BodyMedium>
            </View>
          </View>
          {/** TODO : get number of listed user*/}
        </View>
      </Card.Content>
      {/* <Card.Actions>
        {userId !== activity.userId && (
          <Button
            icon="delete"
            mode="text"
            compact="true"
            onPress={deleteActivityHandler}
            nativeID="deleteActivityButton"
          >
            S&apos;inscrire
          </Button>
        )}
      </Card.Actions> */}
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
    </Card>
  );
};

const styles = StyleSheet.create({
  activityCard: {
    backgroundColor: theme.colors.primaryContainer,
    height: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonsGroup: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  icon: {
    height: 24,
    width: 24,
  },
  cover: {
    opacity: 1,
    width: '100%',
    height: 200,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 8,
    height: 28,
    width: 150,
    justifyContent: 'center',
  },
  numberPersonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  participantContainer: {
    alignItems: 'center',
  },
  error: {
    backgroundColor: '#e35d6a',
  },
  success: {
    backgroundColor: '#479f76',
  },
});

export default ActivityDetails;
