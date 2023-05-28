import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ActivityCard from '../../components/activity/ActivityCard';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import { ActivityIndicator, IconButton, Searchbar } from 'react-native-paper';
import { getFilteredActivities } from '../../store/thunks/activitiesThunk';
import theme from '../../theme';
import Filters from '../../components/activity/Filters';
import BodyMedium from '../../components/shared/typography/BodyMedium';
import { setSelectedActivity } from '../../store/slices/activitiesSlice';

const SearchPage = ({ navigation, parentRoute }) => {
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
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const goToActivityDetails = (activity) => {
    dispatch(setSelectedActivity(activity));
    navigation.navigate('ActivityDetails');
  };
  
  useEffect(() => {
    if (parentRoute?.params?.category) {
      setCategory(parentRoute.params.category);
    }
  }, [parentRoute?.params?.category]);

  useEffect(() => {
    setLoading(true);
    const res = dispatch(
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
    res.then(() => {
      setLoading(false);
    });
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
  const Map = Platform.OS === "web" ?
    lazy(() => import('../../components/activity/Map')) :
    lazy(() => import('../../components/activity/MapMobile'));

  return (
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
            inputRange: [0, 1],
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
      { loading && <ActivityIndicator />}
      { appActivities.length === 0 && !loading && <BodyMedium>Aucun résultat</BodyMedium>}
      { appActivities.length > 0 && 
      <Suspense fallback={<ActivityIndicator />}>
        <Map activities={appActivities} goToActivityDetails={goToActivityDetails} navigation={navigation} />
      </Suspense>}
      <ScrollView horizontal={true} style={{ marginBottom: 20, maxHeight: 250 }}>
        <View style={styles.activitiesContainer}>
          {appActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              imageHeight={120}
              width={300}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    gap: 10,
    margin: 12,
    height: '100%',
  },
  activitiesContainer: {
    gap: 18,
    flexDirection: 'row',
    marginBottom: 14,
    marginHorizontal: 8,
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
