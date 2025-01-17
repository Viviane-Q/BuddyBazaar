import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import theme from '../../theme';
import SearchPage from '../main/SearchPage';
import ActivityDetails from '../sub/ActivityDetails';
import ActivityForm from '../sub/ActivityForm';

const SearchStack = createNativeStackNavigator();

export default function SearchStackScreen({ route }) {
  const SearchPageWrapper = (props) => {
    return (
      <SearchPage {...props} parentRoute={route} />
    );
  }
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTitle: (props) => <TitleMedium>{props.children}</TitleMedium>,
        headerStyle: { backgroundColor: theme.colors.primaryContainer },
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={SearchPageWrapper}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="ActivityDetails"
        component={ActivityDetails}
        options={{ title: "Détails de l'activité" }}
      />
      <SearchStack.Screen
        name="ActivityForm"
        component={ActivityForm}
        options={({ route }) => ({
          title: route?.params?.isUpdate
            ? 'Modifier une activité'
            : 'Créer une activité',
        })}
      />
    </SearchStack.Navigator>
  );
}