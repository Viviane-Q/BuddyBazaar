import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Category from '../../entities/Category';
import ActivityCard from '../../components/activity/ActivityCard';
import theme from '../../theme';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import { useDispatch } from 'react-redux';
import {
  getActivitiesByCategory,
  getActivitiesByDateRange,
} from '../../store/thunks/activitiesThunk';

const DiscoverPage = ({ navigation }) => {
  const [activitiesTonight, setActivitiesTonight] = useState([]);
  const [activitiesThisWeekend, setActivitiesThisWeekend] = useState([]);

  const dispatch = useDispatch();

  const getActivitiesTonight = () => {
    const tonight = new Date();
    tonight.setHours(18, 0, 0, 0);
    const tomorrow = new Date(tonight);
    tomorrow.setDate(tonight.getDate() + 1);
    const res = dispatch(
      getActivitiesByDateRange({
        startDate: tonight.toISOString(),
        endDate: tomorrow.toISOString(),
      })
    );
    res.then((res) => {
      if (res.payload?.data.activities) {
        setActivitiesTonight(res.payload?.data.activities);
      }
    });
  };

  const getActivitiesThisWeekend = () => {
    const dayOfWeek = 6; // saturday
    const weekEndStart = new Date();
    weekEndStart.setHours(0, 0, 0, 0);
    // if today is not saturday or sunday, get the next saturday
    if (weekEndStart.getDay() < dayOfWeek && weekEndStart.getDay() != 0) {
      weekEndStart.setDate(
        weekEndStart.getDate() + ((dayOfWeek + 7 - weekEndStart.getDay()) % 7)
      );
    }
    const weekEndEnd = new Date(weekEndStart)
    // if weekEndStart is sunday, get the next day
    if (weekEndStart.getDay() == 0) {
      weekEndEnd.setDate(weekEndEnd.getDate() + 1);
    } else if (weekEndStart.getDay() == 6) {
      weekEndEnd.setDate(weekEndEnd.getDate() + 2);
    }
    const res = dispatch(
      getActivitiesByDateRange({
        startDate: weekEndStart.toISOString(),
        endDate: weekEndEnd.toISOString(),
      })
    );
    res.then((res) => {
      if (res.payload?.data.activities) {
        setActivitiesThisWeekend(res.payload?.data.activities);
      }
    });
  };

  useEffect(() => {
    getActivitiesTonight();
    getActivitiesThisWeekend();
  }, []);

  const searchCategory = (category) => {
    dispatch(getActivitiesByCategory({ category }));
    navigation.navigate('Search');
  };

  return (
    <ScrollView>
      <View style={styles.viewContainer}>
        <View>
          <TitleMedium>Activités par catégorie</TitleMedium>
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
              {activitiesTonight &&
                activitiesTonight.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    imageHeight={150}
                    width={300}
                    navigation={navigation}
                  />
                ))}
            </View>
          </ScrollView>
        </View>
        <View>
          <TitleMedium>Ce weekend</TitleMedium>
          <ScrollView horizontal={true}>
            <View style={styles.activitiesContainer}>
              {activitiesThisWeekend &&
                activitiesThisWeekend.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    imageHeight={150}
                    width={300}
                    navigation={navigation}
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
    paddingVertical: 18,
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
