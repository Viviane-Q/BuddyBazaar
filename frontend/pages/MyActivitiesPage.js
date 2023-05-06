import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnActivities } from '../store/thunks/activitiesThunk';
import ActivityCard from '../components/activity/ActivityCard';
import TitleMedium from '../components/shared/typography/TitleMedium';

const MyActivitiesPage = ({ navigation }) => {
  const userActivities = useSelector(
    (state) => state.activities.userActivities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnActivities());
  }, []);

  const createActivity = () => {
    navigation.navigate('ActivityForm');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <TitleMedium>Mes activités</TitleMedium>
          <View style={styles.activitiesContainer}>
            {userActivities &&
              userActivities.map((activity) => {
                return (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    imageHeight={150}
                    width={Dimensions.get('window').width < 500 ? 'auto' : 300}
                  />
                );
              })}
          </View>
        </View>
      </ScrollView>
      <IconButton
        icon="plus"
        size={30}
        onPress={createActivity}
        style={styles.newActivityButton}
        nativeID="newActivityButton"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  newActivityButton: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 10,
    right: 10,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
  },
  activitiesContainer: {
    flexGrow: Dimensions.get('window').width < 500 ? 1 : 0,
    gap: 18,
    flexDirection: Dimensions.get('window').width < 500 ? 'column' : 'row',
    flexWrap: Dimensions.get('window').width < 500 ? 'nowrap' : 'wrap',
  },
  viewContainer: {
    gap: 18,
    margin: 18,
  },
});

export default MyActivitiesPage;
