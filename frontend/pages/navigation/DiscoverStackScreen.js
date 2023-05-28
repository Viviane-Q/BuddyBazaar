import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import theme from '../../theme';
import DiscoverPage from '../main/DiscoverPage';
import ActivityDetails from '../sub/ActivityDetails';
import ActivityForm from '../sub/ActivityForm';

const DiscoverStack = createNativeStackNavigator();

export default function DiscoverStackScreen() {
  return (
    <DiscoverStack.Navigator
      screenOptions={{
        headerTitle: (props) => <TitleMedium>{props.children}</TitleMedium>,
        headerStyle: { backgroundColor: theme.colors.primaryContainer },
      }}
    >
      <DiscoverStack.Screen
        name="Discover"
        component={DiscoverPage}
        options={{ headerShown: false }}
      />
      <DiscoverStack.Screen
        name="ActivityDetails"
        component={ActivityDetails}
        options={{ title: "Détails de l'activité" }}
      />
      <DiscoverStack.Screen
        name="ActivityForm"
        component={ActivityForm}
        options={({ route }) => ({
          title: route?.params?.isUpdate
            ? 'Modifier une activité'
            : 'Créer une activité',
        })}
      />
    </DiscoverStack.Navigator>
  );
}