import Message from '../../../domain/entities/Message';
import MessageRepositoryInMemory from '../../../adapters/driven/repositories/MessageRepositoryInMemory';
import MessageFixtures from '../../../domain/entities/Message.fixtures';
import GetMessagesByActivityId from './GetMessagesByActivityId';
import ActivityFixtures from '../../../domain/entities/Activity.fixtures';

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
      MessageFixtures.messageFromJeanToCinema,
      MessageFixtures.messageFromMartinToCinema,
    ]);
    const activityMessages = await whenUserRetrivesMessagesForAnActivity(ActivityFixtures.activityClimbing.id as number);
    expect(activityMessages).toEqual([
      MessageFixtures.messageFromJeanToClimbing,
    ]);
  });
  test("Example: User wants to retrieve the messages he's received and he's sent", async () => {
    givenMessages([
      MessageFixtures.messageFromJeanToClimbing,
      MessageFixtures.messageFromJeanToCinema,
      MessageFixtures.messageFromMartinToCinema,
    ]);
    const activityMessages = await whenUserRetrivesMessagesForAnActivity(ActivityFixtures.activityCinema.id as number);
    expect(activityMessages).toEqual([
      MessageFixtures.messageFromJeanToCinema,
      MessageFixtures.messageFromMartinToCinema,
    ]);
  });
});
