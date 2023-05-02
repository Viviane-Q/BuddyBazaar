import React from 'react';
import { Button, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Category from '../entities/Category';
import ActivityCard from '../components/activity/ActivityCard';

const activities = [
  {
    id: 1,
    title: 'Football',
    description: 'Venez jouer au football avec nous !',
    startDate: new Date(),
    endDate: new Date(),
    numberPersonMax: 10,
    cost: 0,
    place: 'Stade de la Mosson',
    category: Category.Sport,
  },
  {
    id: 2,
    title: 'Basketball',
    description: 'Venez jouer au basketball avec nous !',
    startDate: new Date(),
    endDate: new Date(),
    numberPersonMax: 10,
    cost: 0,
    place: 'Stade de la Mosson',
    category: Category.Sport,
  },
  {
    id: 3,
    title: 'Tennis',
    description: 'Venez jouer au tennis avec nous !',
    startDate: new Date(),
    endDate: new Date(),
    numberPersonMax: 10,
    cost: 0,
    place: 'Stade de la Mosson',
    category: Category.Sport,
  },
];

const DiscoverPage = ({ navigation }) => {
  const searchCategory = (category) => {
    navigation.navigate('Search', { category });
  };

  return (
    <ScrollView>
      <View style={styles.viewContainer}>
        <Text variant="titleMedium">
          Découvrez toutes les activités présentes sur notre plateforme !
        </Text>
        <View>
          <Text variant="titleSmall">Par catégorie</Text>
          <View style={styles.categoryButtonsContainer}>
            {Object.values(Category).map((category) => (
              <Button
                key={category}
                title={category}
                mode="contained"
                onPress={() => searchCategory(category)}
              />
            ))}
          </View>
        </View>
        <View>
          <Text variant="titleSmall">Ce soir</Text>
          <ScrollView horizontal={true}>
            <View style={styles.activitiesContainer}>
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </View>
          </ScrollView>
        </View>
        <View>
          <Text variant="titleSmall">Ce weekend</Text>
          <ScrollView horizontal={true}>
            <View style={styles.activitiesContainer}>
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </View>
          </ScrollView>
        </View>
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
  categoryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  activitiesContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    marginVertical: 20,
    marginHorizontal: 8,
  },
});

export default DiscoverPage;
