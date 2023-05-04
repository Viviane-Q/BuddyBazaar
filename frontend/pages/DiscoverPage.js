import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Category from '../entities/Category';
import ActivityCard from '../components/activity/ActivityCard';
import theme from '../theme';
import TitleMedium from '../components/shared/typography/TitleMedium';

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
    //TODO: search by category
    navigation.navigate('Search', { category });
  };

  return (
    <ScrollView>
      <View style={styles.viewContainer}>
        <Text variant="titleMedium">
          Découvrez toutes les activités présentes sur notre plateforme !
        </Text>
        <View>
          <TitleMedium>Par catégorie</TitleMedium>
          <ScrollView horizontal={true}>
            <View style={styles.categoryButtonsContainer}>
              {Object.values(Category).map((category) => (
                <Button
                  key={category}
                  buttonColor={theme.colors.categories[category]}
                  textColor="white"
                  onPress={() => searchCategory(category)}
                  style={styles.categoryButton}
                >
                  {category}
                </Button>
              ))}
            </View>
          </ScrollView>
        </View>
        <View>
          <TitleMedium>Ce soir</TitleMedium>
          <ScrollView horizontal={true}>
            <View style={styles.activitiesContainer}>
              {activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  imageWidth={'100%'}
                  imageHeight={150}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        <View>
          <TitleMedium>Ce weekend</TitleMedium>
          <ScrollView horizontal={true}>
            <View style={styles.activitiesContainer}>
              {activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  imageWidth={'100%'}
                  imageHeight={150}
                />
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
    paddingVertical: 10,
  },
  activitiesContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    marginVertical: 20,
    marginHorizontal: 8,
  },
  categoryButton: {
    borderRadius: 20,
    minWidth: 100,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default DiscoverPage;
