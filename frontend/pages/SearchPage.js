import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ActivityCard from '../components/activity/ActivityCard';

const SearchPage = () => {
  const appActivities = useSelector(
    (state) => state.activities.searchedActivities
  );

  return (
    <ScrollView>
      <View style={styles.viewContainer}>
        <ScrollView horizontal={true}>
          <View style={styles.activitiesContainer}>
            {appActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                imageHeight={150}
                width={300}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 30,
    margin: 18,
  },
  activitiesContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    marginVertical: 20,
    marginHorizontal: 8,
  },
});

export default SearchPage;
