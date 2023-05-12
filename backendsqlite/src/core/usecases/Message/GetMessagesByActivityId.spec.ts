import Message from '../../../domain/entities/Message';
import MessageRepositoryInMemory from '../../../adapters/driven/repositories/MessageRepositoryInMemory';
import MessageFixtures from '../../../domain/entities/Message.fixtures';
import GetMessagesByActivityId from './GetMessagesByActivityId';

const messageRepository = new MessageRepositoryInMemory();

const givenMessages = (messages: Message[]) => {
  messageRepository.persist(messages);
};

const whenUserRetrivesMessagesForAnActivity = (activityId: number) => {
  return GetMessagesByActivityId({ activityId, messageRepository });
};

describe('Feature: an user retrives the messages of an activity', () => {
  beforeEach(() => {
    messageRepository.clear();
  });
  test('Example: User wants to retrieve the message he sent', async () => {
    givenMessages([
      MessageFixtures.messageFromJeanToClimbing,
      MessageFixtures.messageFromJeanToHiking,
      MessageFixtures.messageFromMartinToHiking,
    ]);
    const activityMessages = await whenUserRetrivesMessagesForAnActivity(1);
    expect(activityMessages).toEqual([
      MessageFixtures.messageFromJeanToClimbing,
    ]);
  });
  test("Example: User wants to retrieve the messages he's received and he's sent", async () => {
    givenMessages([
      MessageFixtures.messageFromJeanToClimbing,
      MessageFixtures.messageFromJeanToHiking,
      MessageFixtures.messageFromMartinToHiking,
    ]);
    const activityMessages = await whenUserRetrivesMessagesForAnActivity(2);
    expect(activityMessages).toEqual([
      MessageFixtures.messageFromJeanToHiking,
      MessageFixtures.messageFromMartinToHiking,
    ]);
  });
});
