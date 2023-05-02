import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnActivities } from '../store/thunks/activitiesThunk';
import ActivityCard from '../components/activity/ActivityCard';

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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          {userActivities &&
            userActivities.map((activity) => {
              return <ActivityCard key={activity.id} activity={activity} />;
            })}
        </View>
      </ScrollView>
      <IconButton
        icon="plus"
        size={30}
        onPress={createActivity}
        style={styles.newActivityButton}
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
});

export default MyActivitiesPage;
