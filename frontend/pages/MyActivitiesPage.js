import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import { getOwnActivities } from '../store/thunks/activitiesThunk';

import ActivityCard from '../components/activity/ActivityCard';
import ActivityForm from '../components/activity/ActivityForm';

const MyActivitiesPage = () => {
  const userActivities = useSelector(
    (state) => state.activities.userActivities
  );
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnActivities());
  }, []);

  const displayActivityModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View visible={!modalVisible}>
          {userActivities &&
            userActivities.map((activity) => {
              return <ActivityCard key={activity.id} activity={activity} />;
            })}
        </View>
      </ScrollView>
      <ActivityForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {!modalVisible && (
        <IconButton
          icon="plus"
          size={30}
          onPress={displayActivityModal}
          style={styles.newActivityButton}
        />
      )}
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
