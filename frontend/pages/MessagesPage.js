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
import { getLastMessages } from '../store/thunks/messagesThunk';

const MessagesPage = ({ navigation }) => {
  const userActivities = useSelector(
    (state) => state.activities.userActivities
  );
  const lastMessageByActivity = useSelector(
    (state) => state.messages.lastMessageByActivity
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnActivities());
    dispatch(getLastMessages());
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
            const lastMessage = lastMessageByActivity.find(
              (message) => message.activityId == activity.id
            );
            const timestamp = lastMessage
              ? `${new Date(lastMessage.createdAt).toLocaleDateString(
                  'fr-FR'
                )} ${new Date(lastMessage.createdAt)
                  .toLocaleTimeString('fr-FR')
                  .slice(0, -3)}`
              : '';
            return (
              <View key={activity.id}>
                <List.Item
                  title={() => <TitleSmall numberOfLines={1}>{activity.title}</TitleSmall>}
                  description={() => (
                    <BodyMedium numberOfLines={1}>
                      {lastMessage
                        ? lastMessage.content
                        : 'Encore aucun message envoyé'}
                    </BodyMedium>
                  )}
                  left={() => (
                    <Image
                      source={`https://picsum.photos/700?id=${activity.id}`}
                      style={styles.iconImage}
                    />
                  )}
                  right={() => <BodyMedium>{timestamp}</BodyMedium>}
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
