import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import theme from '../../theme';
import MessagesPage from '../main/MessagesPage';
import MessageRoom from '../sub/MessageRoom';

const MessagesStack = createNativeStackNavigator();

export default function MessagesStackScreen() {
  return (
    <MessagesStack.Navigator
      screenOptions={{
        headerTitle: (props) => <TitleMedium>{props.children}</TitleMedium>,
        headerStyle: { backgroundColor: theme.colors.primaryContainer },
      }}
    >
      <MessagesStack.Screen
        name="MessagesPage"
        component={MessagesPage}
        options={{ headerShown: false }}
      />
      <MessagesStack.Screen
        name="MessageRoom"
        component={MessageRoom}
        options={({ route }) => ({
          title: route?.params?.activity.title,
          tabBarStyle: () => ({ display: 'none' }),
        })}
      />
    </MessagesStack.Navigator>
  );
}
