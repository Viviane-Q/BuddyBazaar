import Message from '../../../domain/entities/Message';
import MessageRepositoryInMemory from '../../../adapters/driven/repositories/MessageRepositoryInMemory';
import MessageFixtures from '../../../domain/entities/Message.fixtures';
import ActivityRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRepositoryInMemory';
import GetLastMessagesByUserId from './GetLastMessagesByUserId';
import UserFixtures from '../../../domain/entities/User.fixtures';
import Activity from '../../../domain/entities/Activity';
import ActivityFixtures from '../../../domain/entities/Activity.fixtures';

const activityRepository = new ActivityRepositoryInMemory();
const messageRepository = new MessageRepositoryInMemory();

const givenActivities = (activities: Activity[]) => {
  activityRepository.persist(activities);
};

const givenMessages = (messages: Message[]) => {
  messageRepository.persist(messages);
};

const whenUserRetrivesLastMessages = (userId: number) => {
  return GetLastMessagesByUserId({
    userId,
    messageRepository,
    activityRepository,
  });
};

describe('Feature: an user retrives the messages for each of their activities', () => {
  beforeEach(() => {
    messageRepository.clear();
    activityRepository.clear();
  });
  test('Example: User wants to retrieve the last messages he sent or received', async () => {
    givenActivities([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityCinema,
    ]);
    givenMessages([
      MessageFixtures.messageFromJeanToClimbing,
      MessageFixtures.messageFromJeanToCinema,
      MessageFixtures.messageFromMartinToCinema,
    ]);
    const activityMessages = await whenUserRetrivesLastMessages(
      UserFixtures.userJean.id as number
    );
    expect(activityMessages).toEqual([
      MessageFixtures.messageFromJeanToClimbing,
      MessageFixtures.messageFromMartinToCinema,
    ]);
  });
});
