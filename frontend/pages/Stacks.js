import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import RegisterPage from './RegisterPage';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import { setToken } from '../store/slices/authSlice';
import ActivityForm from '../components/activity/ActivityForm';
import ActivityDetails from '../components/activity/ActivityDetails';
import { getUser } from '../store/thunks/authThunk';
import MessageRoom from '../components/message/MessageRoom';

const Stack = createNativeStackNavigator();

const Stacks = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    async function retrieveToken() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(setToken(token));
      }
    }
    retrieveToken();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [token]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'left',
        }}
      >
        <Stack.Screen
          name="Landing"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: 'Connexion' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ title: 'Inscription' }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ActivityForm"
          component={ActivityForm}
          options={({ route }) => ({
            title: route?.params?.activity
              ? 'Modifier une activité'
              : 'Créer une activité',
          })}
        />
        <Stack.Screen
          name="ActivityDetails"
          component={ActivityDetails}
          options={{ title: "Détails de l'activité" }}
        />
        <Stack.Screen
          name="MessageRoom"
          component={MessageRoom}
          options={({ route }) => ({
            title: route?.params?.activity.title,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
