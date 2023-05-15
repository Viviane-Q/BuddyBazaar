import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import theme from '../../theme';
import BodyMedium from '../../components/shared/typography/BodyMedium';
import TitleSmall from '../../components/shared/typography/TitleSmall';
import BodySmall from '../../components/shared/typography/BodySmall';
import { useSelector, useDispatch } from 'react-redux';
import {
  sendMessage,
  joinRoom,
  listenToMessages,
  getMessages,
} from '../../store/thunks/messagesThunk';
import { navigationStyles } from '../navigation/Navigation';

const MessageRoom = ({ navigation, route }) => {
  const messagesList = useSelector((state) => state.messages.messages);
  const userId = useSelector((state) => state.auth.id);
  const activityId = route.params.activity.id;
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const scrollViewRef = useRef();

  useEffect(() => {
    dispatch(joinRoom({ activityId }));
    dispatch(listenToMessages({ activityId }));
    dispatch(getMessages({ activityId }));
    // hide tab bar
    navigation.getParent().setOptions({
      tabBarStyle: { display: 'none' },
    });
    return () => {
      // show tab bar when leaving screen
      navigation.getParent().setOptions({
        tabBarStyle: navigationStyles.navigationBar,
      });
    };
  }, []);

  const sendMessageHandler = () => {
    if (!message) return;
    dispatch(sendMessage({ content: message, activityId }));
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {messagesList &&
          messagesList.map((message) => {
            const timestamp = `${new Date(message.createdAt).toLocaleDateString(
              'fr-FR'
            )} ${new Date(message.createdAt)
              .toLocaleTimeString('fr-FR')
              .slice(0, -3)}`;
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
                  {timestamp}
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
