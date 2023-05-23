import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ActivityCard from '../../components/activity/ActivityCard';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import { IconButton, Searchbar } from 'react-native-paper';
import { getFilteredActivities } from '../../store/thunks/activitiesThunk';
import theme from '../../theme';
import Filters from '../../components/activity/Filters';

const SearchPage = ({ navigation, route, parentRoute }) => {
  const appActivities = useSelector(
    (state) => state.activities.searchedActivities
  );
  const [querySearch, setSearchQuery] = useState();
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [category, setCategory] = useState();
  const [numberPersonMax, setNumberPersonMax] = useState();
  const [cost, setCost] = useState();
  const [displayFilter, setDisplayFilter] = useState(false);
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if(parentRoute?.params?.category) {
      setCategory(parentRoute.params.category);
    }
  }, [parentRoute?.params?.category]);

  useEffect(() => {
    dispatch(
      getFilteredActivities({
        querySearch,
        startDate,
        startTime,
        endDate,
        endTime,
        category,
        cost,
        numberPersonMax,
      })
    );
  }, [
    querySearch,
    startDate,
    startTime,
    endDate,
    endTime,
    category,
    cost,
    numberPersonMax,
  ]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: displayFilter ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [displayFilter]);

  return (
    <ScrollView>
      <View style={styles.viewContainer}>
        <TitleMedium>Recherche</TitleMedium>
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Rechercher"
            onChangeText={setSearchQuery}
            value={querySearch}
            style={styles.searchBar}
            nativeID="searchBar"
          />
          <IconButton
            icon={
              displayFilter ? 'filter-variant-minus' : 'filter-variant-plus'
            }
            size={30}
            onPress={() => setDisplayFilter(!displayFilter)}
            nativeID="displayFilterButton"
            iconColor={theme.colors.secondary}
            style={{ margin: 0 }}
          />
        </View>
        <Animated.View // Special animatable View
          style={{
            opacity: fadeAnim, // Bind opacity to animated value
            height: fadeAnim.interpolate({
              inputRange: [0,1],
              outputRange: [0, 370],
            }),
          }}
        >
          <Filters
            {...{
              setStartDate,
              setStartTime,
              setEndDate,
              setEndTime,
              category,
              setCategory,
              numberPersonMax,
              setNumberPersonMax,
              cost,
              setCost,
            }}
          />
        </Animated.View>
        <View style={styles.activitiesContainer}>
          {appActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              imageHeight={150}
              width={
                Dimensions.get('window').width < 500 ? 'auto' : 300
              }
              navigation={navigation}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    gap: 18,
    margin: 18,
  },
  activitiesContainer: {
    flexGrow: Dimensions.get('window').width < 500 ? 1 : 0,
    gap: 18,
    flexDirection: Dimensions.get('window').width < 500 ? 'column' : 'row',
    flexWrap: Dimensions.get('window').width < 500 ? 'nowrap' : 'wrap',
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.outline,
    height: 50,
  },
});

export default SearchPage;
