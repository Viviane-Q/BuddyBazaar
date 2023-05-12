import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import theme from '../../theme';
import BodyMedium from '../shared/typography/BodyMedium';
import TitleSmall from '../shared/typography/TitleSmall';
import BodySmall from '../shared/typography/BodySmall';
import { useSelector, useDispatch } from 'react-redux';
import {
  sendMessage,
  joinRoom,
  listenToMessages,
  getMessages
} from '../../store/thunks/messagesThunk';

const MessageRoom = ({ route }) => {
  const messagesList = useSelector((state) => state.messages.messages);
  const userId = useSelector((state) => state.auth.id);
  const activityId = route.params.activity.id;
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(joinRoom({ activityId }));
    dispatch(listenToMessages({ activityId }));
    dispatch(getMessages({ activityId }));
    // scroll to bottom
  }, []);

  const sendMessageHandler = () => {
    if (!message) return;
    dispatch(sendMessage({ content: message, activityId }));
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {messagesList &&
          messagesList.map((message) => {
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
                    {message.user.name}
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
          onSubmitEditing={sendMessageHandler}
        />
        <IconButton
          icon="send"
          iconColor={theme.colors.primary}
          onPress={sendMessageHandler}
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
