import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import theme from '../../theme';
import UserProfilePage from '../main/UserProfilePage';

const MessagesStack = createNativeStackNavigator();

export default function UserProfileStackScreen() {
  return (
    <MessagesStack.Navigator
      screenOptions={{
        headerTitle: (props) => <TitleMedium>{props.children}</TitleMedium>,
        headerStyle: { backgroundColor: theme.colors.primaryContainer },
      }}
    >
      <MessagesStack.Screen
        name="UserProfilePage"
        component={UserProfilePage}
        options={{ headerShown: false }}
      />
    </MessagesStack.Navigator>
  );
}
