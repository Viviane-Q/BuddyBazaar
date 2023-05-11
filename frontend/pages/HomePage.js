import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, BottomNavigation } from 'react-native-paper';
import { setToken } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyActivitiesPage from './MyActivitiesPage';
import DiscoverPage from './DiscoverPage';
import theme from '../theme';
import SearchPage from './SearchPage';
import MessagesPage from './MessagesPage';

// TODO move this to a separate file
const ProfileRoute = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const disconnect = () => {
    dispatch(setToken(null));
    AsyncStorage.removeItem('token');
    navigation.navigate('Landing');
  };
  return (
    token && (
      <Button onPress={disconnect} mode="outlined" style={{ marginTop: 50 }}>
        Se déconnecter
      </Button>
    )
  );
};

const HomePage = ({ navigation }) => {
  const token = useSelector((state) => state.auth.token);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'discover',
      focusedIcon: 'compass',
      unfocusedIcon: 'compass-outline',
    },
    {
      key: 'search',
      focusedIcon: 'map-search',
      unfocusedIcon: 'map-search-outline',
    },
    {
      key: 'myactivities',
      focusedIcon: 'clipboard-text',
      unfocusedIcon: 'clipboard-text-outline',
    },
    {
      key: 'messages',
      focusedIcon: 'chat',
      unfocusedIcon: 'chat-outline',
    },
    {
      key: 'profile',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);
  if (!token) {
    routes.splice(2, 3);
  }

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'discover':
        return <DiscoverPage jumpTo={jumpTo} navigation={navigation} />;
      case 'myactivities':
        return <MyActivitiesPage jumpTo={jumpTo} navigation={navigation} />;
      case 'search':
        return <SearchPage jumpTo={jumpTo} navigation={navigation} />;
      case 'messages':
        return <MessagesPage jumpTo={jumpTo} navigation={navigation}/>;
      case 'profile':
        return <ProfileRoute jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  return (
    <View style={{ flex: 1, overflow: 'scroll', justifyContent: 'flex-end' }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.navigationBar}
        activeColor={theme.colors.primary}
        inactiveColor={theme.colors.secondaryContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: theme.colors.primary,
    height: 60,
  },
});

export default HomePage;
