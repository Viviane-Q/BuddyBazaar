import React, { useEffect, useState, lazy, Suspense } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Image } from 'expo-image';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import BodyMedium from '../../components/shared/typography/BodyMedium';
import { IconButton, Snackbar, Divider, Button, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteActivity,
  registerForActivity,
  unregisterForActivity,
} from '../../store/thunks/activitiesThunk';
import theme from '../../theme';
import TitleSmall from '../../components/shared/typography/TitleSmall';
import { navigationStyles } from '../navigation/Navigation';

const ActivityDetails = ({ navigation, route }) => {
  const MapPreview = Platform.OS === "web" ?
    lazy(() => import('../../components/activity/MapPreview')) :
    lazy(() => import('../../components/activity/MapPreviewMobile'));

  const [activity, setActivity] = useState(route.params.activity);
  const userId = useSelector((state) => state.auth.id);
  const ownsActivity = activity.userId === userId;
  const dispatch = useDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState(
    'Une erreur est survenue'
  );
  const startDate = `${new Date(activity.startDate).toLocaleDateString(
    'fr-FR'
  )} ${new Date(activity.startDate).toLocaleTimeString('fr-FR').slice(0, -3)}`;
  const endDate = `${new Date(activity.endDate).toLocaleDateString(
    'fr-FR'
  )} ${new Date(activity.endDate).toLocaleTimeString('fr-FR').slice(0, -3)}`;

  useEffect(() => {
    // hide tab bar
    navigation.getParent().setOptions({
      tabBarStyle: { display: 'none' },
    });
    return () => {
      // show tab bar when leaving screen
      navigation.getParent().setOptions({
        tabBarStyle: navigationStyles.navigationBar,
      });
    };
  }, []);

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
      navigation.navigate('MyActivities');
    });
  };

  const editActivityHandler = () => {
    navigation.navigate('ActivityForm', { activity });
  };

  const registerActivityHandler = () => {
    const res = dispatch(registerForActivity({ activityId: activity.id }));
    res.then((res) => {
      if (!res.payload || res.payload.error) {
        setSnackbarVisible(true);
        setSnackbarType('error');
        setSnackbarMessage('Une erreur est survenue');
        return;
      }
      setSnackbarVisible(true);
      setSnackbarType('success');
      setSnackbarMessage('Inscription réussie');
      setActivity({
        ...activity,
        participants: [...activity.participants, userId],
      });
    });
  };

  const unregisterActivityHandler = () => {
    const res = dispatch(unregisterForActivity({ activityId: activity.id }));
    res.then((res) => {
      if (!res.payload || res.payload.error) {
        setSnackbarVisible(true);
        setSnackbarType('error');
        setSnackbarMessage('Une erreur est survenue');
        return;
      }
      setSnackbarVisible(true);
      setSnackbarType('success');
      setSnackbarMessage('Désinscription réussie');
      setActivity({
        ...activity,
        participants: activity.participants.filter((p) => p !== userId),
      });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={`https://picsum.photos/700?id=${activity.id}`}
            style={styles.cover}
          />
        </View>
        <View style={{ gap: 16, margin: 16 }}>
          <View style={styles.titleContainer}>
            <TitleMedium style={{ color: theme.colors.primary }}>
              {activity.title}
            </TitleMedium>
            {ownsActivity && (
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
          <Suspense fallback={<ActivityIndicator />}>
            <MapPreview latitude={activity.latitude} longitude={activity.longitude} />
          </Suspense>
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
            <TitleSmall style={{ fontWeight: 'bold' }}>
              Description
            </TitleSmall>
            <BodyMedium>{activity.description}</BodyMedium>
          </View>
          <Divider
            style={{ backgroundColor: theme.colors.tertiaryContainer }}
          />
          <View style={styles.participantContainer}>
            <TitleSmall style={{ fontWeight: 'bold' }}>
              Participants
            </TitleSmall>
            <View style={styles.numberPersonContainer}>
              <IconButton
                icon="account-group"
                compact="true"
                iconColor={theme.colors.secondary}
                size={24}
              />
              <BodyMedium style={{ fontWeight: 'bold', fontSize: 18 }}>
                {activity.participants?.length ?? 0}/
                {activity.numberPersonMax}
              </BodyMedium>
            </View>
          </View>
          {!activity.participants?.includes(userId) ? (
            <Button
              icon="account-plus"
              mode="contained"
              onPress={registerActivityHandler}
              nativeID="registerActivityButton"
              style={{
                ...styles.registerButton,
                display:
                  activity.participants?.length < activity.numberPersonMax &&
                    userId &&
                    !ownsActivity
                    ? 'flex'
                    : 'none',
              }}
            >
              S&apos;inscrire
            </Button>
          ) : (
            <Button
              icon="account-minus"
              mode="contained"
              onPress={unregisterActivityHandler}
              nativeID="unregisterActivityButton"
              style={{
                ...styles.registerButton,
                display: userId && !ownsActivity ? 'flex' : 'none',
              }}
            >
              Se désinscrire
            </Button>
          )}
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
      </ScrollView >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.primaryContainer,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  registerButton: {
    width: 250,
    margin: 16,
    alignSelf: 'center',
  },
  error: {
    backgroundColor: '#e35d6a',
  },
  success: {
    backgroundColor: '#479f76',
  },
});

export default ActivityDetails;
