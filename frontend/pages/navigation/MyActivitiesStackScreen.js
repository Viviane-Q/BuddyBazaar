import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import theme from '../../theme';
import MyActivitiesPage from '../main/MyActivitiesPage';
import ActivityDetails from '../sub/ActivityDetails';
import ActivityForm from '../sub/ActivityForm';

const MyActivitiesStack = createNativeStackNavigator();

export default function MyActivitiesStackScreen() {
  return (
    <MyActivitiesStack.Navigator
      screenOptions={{
        headerTitle: (props) => <TitleMedium>{props.children}</TitleMedium>,
        headerStyle: { backgroundColor: theme.colors.primaryContainer },
      }}
    >
      <MyActivitiesStack.Screen
        name="MyActivities"
        component={MyActivitiesPage}
        options={{ headerShown: false }}
      />
      <MyActivitiesStack.Screen
        name="ActivityDetails"
        component={ActivityDetails}
        options={{ title: "Détails de l'activité" }}
      />
      <MyActivitiesStack.Screen
        name="ActivityForm"
        component={ActivityForm}
        options={({ route }) => ({
          title: route?.params?.activity
            ? 'Modifier une activité'
            : 'Créer une activité',
        })}
      />
    </MyActivitiesStack.Navigator>
  );
}
