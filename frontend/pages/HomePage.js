import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, BottomNavigation, Text } from 'react-native-paper';
import { setToken } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyActivitiesPage from './MyActivitiesPage';
import DiscoverPage from './DiscoverPage';
import theme from '../theme';
import SearchPage from './SearchPage';

const MessagesRoute = () => <Text>Mes messages</Text>;

const ProfileRoute = () => <Text>Mon profil</Text>;

const HomePage = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const disconnect = () => {
    dispatch(setToken(null));
    AsyncStorage.removeItem('token');
    navigation.navigate('Landing');
  };

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
      badge: true,
    },
    {
      key: 'messages',
      focusedIcon: 'chat',
      unfocusedIcon: 'chat-outline',
      badge: 10,
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
        return <DiscoverPage jumpTo={jumpTo}/>;
      case 'myactivities':
        return <MyActivitiesPage jumpTo={jumpTo} navigation={navigation} />;
      case 'search':
        return <SearchPage jumpTo={jumpTo} />;
      case 'messages':
        return <MessagesRoute jumpTo={jumpTo} />;
      case 'profile':
        return <ProfileRoute jumpTo={jumpTo} />;
    }
  };

  return (
    <View style={{ flex: 1, overflow: 'scroll', justifyContent: 'flex-end' }}>
      {token && (
        <Button onPress={disconnect} mode="outlined" style={{marginTop: 50}}>
          Se déconnecter
        </Button>
      )}
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
