import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import theme from '../../theme';
import BodyMedium from '../shared/typography/BodyMedium';
import TitleSmall from '../shared/typography/TitleSmall';
import BodySmall from '../shared/typography/BodySmall';
import { useSelector } from 'react-redux';

const messages = [
  {
    id: 1,
    content: 'Hello',
    user: {
      id: 1,
      username: 'John',
    },
    activityId: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    content: 'Hello',
    user: {
      id: 2,
      username: 'Jane',
    },
    activityId: 1,
    createdAt: new Date(),
  },
  {
    id: 3,
    content:
      'Hellooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
    user: {
      id: 1,
      username: 'John',
    },
    activityId: 1,
    createdAt: new Date(),
  },
  {
    id: 4,
    content:
      'Hello usdhfsdkgdslflsdjfidsjfol sdfjsifds dsf sdhf jsd fsd dskfkdskfdsfhn sdkjfh usd fsd fds f',
    user: {
      id: 1,
      username: 'John',
    },
    activityId: 1,
    createdAt: new Date(),
  },
  {
    id: 5,
    content:
      'Hello usdhfsdkgdslflsdjfidsjfol sdfjsifds dsf sdhf jsd fsd dskfkdskfdsfhn sdkjfh usd fsd fds f',
    user: {
      id: 1,
      username: 'John',
    },
    activityId: 1,
    createdAt: new Date(),
  },
  {
    id: 6,
    content:
      'Hello usdhfsdkgdslflsdjfidsjfol sdfjsifds dsf sdhf jsd fsd dskfkdskfdsfhn sdkjfh usd fsd fds f',
    user: {
      id: 1,
      username: 'John',
    },
    activityId: 1,
    createdAt: new Date(),
  },
  {
    id: 7,
    content:
      'Hello usdhfsdkgdslflsdjfidsjfol sdfjsifds dsf sdhf jsd fsd dskfkdskfdsfhn sdkjfh usd fsd fds f',
    user: {
      id: 2,
      username: 'John',
    },
    activityId: 1,
    createdAt: new Date(),
  },
];

const MessageRoom = () => {
  const userId = useSelector((state) => state.auth.id);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMessages();
    // scroll to bottom
  }, []);

  const getMessages = () => {
    // get messages by activityId
  };

  const sendMessage = () => {
    // send message
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages &&
          messages.map((message) => {
            return (
              <View
                key={message.id}
                style={
                  message.user.id === userId
                    ? styles.sentMessage
                    : styles.receivedMessage
                }
              >
                {message.user.id !== userId && (
                  <TitleSmall style={{ color: theme.colors.primaryContainer }}>
                    {message.user.username}
                  </TitleSmall>
                )}
                <BodyMedium style={{ color: theme.colors.primaryContainer }}>
                  {message.content}
                </BodyMedium>
                <BodySmall style={{ color: theme.colors.primaryContainer }}>
                  {message.createdAt.toLocaleString('fr-FR')}
                </BodySmall>
              </View>
            );
          })}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Ecrivez votre message..."
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          nativeID="messageInput"
        />
        <IconButton
          icon="send"
          iconColor={theme.colors.primary}
          onPress={sendMessage}
          nativeID="sendMessageButton"
        />
      </View>
    </View>
  );
};

const messageContainer = {
  margin: 6,
  marginHorizontal: 18,
  padding: 10,
  borderRadius: 10,
  maxWidth: '80%',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryContainer,
  },
  sentMessage: {
    ...messageContainer,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    ...messageContainer,
    backgroundColor: theme.colors.secondary,
    alignSelf: 'flex-start',
  },
  input: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 6,
  },
});

export default MessageRoom;
