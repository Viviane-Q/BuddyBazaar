import Message from '../../../domain/entities/Message';
import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';
import MessageRepository from '../../../domain/interfaces/repositories/MessageRepository';

export default async ({
  userId,
  messageRepository,
  activityRepository,
}: {
  userId: number;
  messageRepository: MessageRepository;
  activityRepository: ActivityRepository;
}): Promise<Message[]> => {
  const ownedActivities = await activityRepository.getAllByUserId(userId);
  const registeredActivities =
    await activityRepository.getAllRegisteredByUserId(userId);
  const activityIds = [
    ...ownedActivities.map((activity) => activity.id),
    ...registeredActivities.map((activity) => activity.id),
  ] as number[];
  return messageRepository.getLastMessagesForActivities(activityIds);
};
