import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TitleMedium from '../components/shared/typography/TitleMedium';
import { List, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { getOwnActivities } from '../store/thunks/activitiesThunk';
import theme from '../theme';
import { Image } from 'expo-image';
import BodyMedium from '../components/shared/typography/BodyMedium';
import TitleSmall from '../components/shared/typography/TitleSmall';

const MessagesPage = ({ navigation }) => {
  const userActivities = useSelector(
    (state) => state.activities.userActivities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnActivities());
  }, []);

  const showMessages = ({ activity }) => {
    navigation.navigate('MessageRoom', { activity });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <TitleMedium>Mes messages</TitleMedium>
          {userActivities.map((activity) => {
            return (
              <View key={activity.id}>
                <List.Item
                  title={() => <TitleSmall>{activity.title}</TitleSmall>}
                  description={() => <BodyMedium>{'Last message'}</BodyMedium>}
                  left={() => (
                    <Image
                      source={`https://picsum.photos/700?id=${activity.id}`}
                      style={styles.iconImage}
                    />
                  )}
                  right={() => <BodyMedium>Timestamp</BodyMedium>}
                  onPress={() => showMessages({ activity })}
                />
                <Divider
                  style={{ backgroundColor: theme.colors.tertiaryContainer }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    margin: 18,
  },
  iconImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default MessagesPage;
