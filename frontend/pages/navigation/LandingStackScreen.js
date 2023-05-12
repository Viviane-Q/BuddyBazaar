import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import theme from '../../theme';
import LoginPage from '../sub/LoginPage';
import RegisterPage from '../sub/RegisterPage';
import LandingPage from '../main/LandingPage';

const LandingStack = createNativeStackNavigator();
export default function LandingStackScreen() {
  return (
    <LandingStack.Navigator
      screenOptions={{
        headerTitle: (props) => <TitleMedium>{props.children}</TitleMedium>,
        headerStyle: { backgroundColor: theme.colors.primaryContainer },
      }}
    >
      <LandingStack.Screen
        name="Landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <LandingStack.Screen
        name="Login"
        component={LoginPage}
        options={{ title: 'Connexion' }}
      />
      <LandingStack.Screen
        name="Register"
        component={RegisterPage}
        options={{ title: 'Inscription' }}
      />
    </LandingStack.Navigator>
  );
}
