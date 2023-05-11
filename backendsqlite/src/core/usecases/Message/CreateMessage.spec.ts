import Message from '../../../domain/entities/Message';
import MessageRepositoryInMemory from '../../../adapters/driven/repositories/MessageRepositoryInMemory';
import CreateMessage from './CreateMessage';
import MessageFixtures from '../../../domain/entities/Message.fixtures';

const messageRepository = new MessageRepositoryInMemory();

const givenMessages = (messages: Message[]) => {
  messageRepository.persist(messages);
};

const whenUserSendsMessage = (message: Message) => {
  return CreateMessage({ message, messageRepository });
};

const thenMessagesShouldBe = async (message: Message[]) => {
  const expectedMessages = await messageRepository.getAll();
  expect(message).toEqual(expectedMessages);
};

describe('Feature: an user sends a message to an activity room', () => {
  test('Example: User wants to send his first message', async () => {
    givenMessages([]);
    await whenUserSendsMessage(MessageFixtures.messageFromJeanToClimbing);
    await thenMessagesShouldBe([MessageFixtures.messageFromJeanToClimbing]);
  });
});
