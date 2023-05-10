import Activity from '../../../domain/entities/Activity';
import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';

export default async ({
  userId,
  activityRepository,
}: {
  userId: number;
  activityRepository: ActivityRepository;
}): Promise<Activity[]> => {
  const ownActivities = await activityRepository.getAllByUserId(userId);
  const registeredActivities = await activityRepository.getAllRegisteredByUserId(userId);
  return [...ownActivities, ...registeredActivities];
};
