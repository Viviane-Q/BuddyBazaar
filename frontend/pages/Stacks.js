import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import {useDispatch} from 'react-redux';
import RegisterPage from './RegisterPage';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import { setToken } from '../store/slices/authSlice';
import ActivityForm from '../components/activity/ActivityForm';

const Stack = createNativeStackNavigator();

const Stacks = () => {
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


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Landing'
        screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'left'
        }}
      >
        <Stack.Screen
          name="Landing"
          component={LandingPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{title: 'Connexion'}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{title: 'Inscription'}}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ActivityForm"
          component={ActivityForm}
          options={{title: 'Créer une activité'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;