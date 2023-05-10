import ActivityRegistrationRepository from '../../../domain/interfaces/repositories/ActivityRegistrationRepository';
import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';

export default async ({
  activityId,
  userId,
  activityRepository,
  activityRegistrationRepository,
}: {
  activityId: number;
  userId: number;
  activityRepository: ActivityRepository;
  activityRegistrationRepository: ActivityRegistrationRepository;
}): Promise<boolean> => {
  const activity = await activityRepository.getById(activityId);
  if (!activity) {
    throw new Error('Activity not found');
  }
  if (activity.userId === userId) {
    throw new Error('You cannot register for your own activity');
  }
  if (activity.startDate < new Date()) {
    throw new Error('Activity already started');
  }
  const registeredCount =
    await activityRegistrationRepository.countRegisteredForAnActivity(
      activityId
    );
  if (registeredCount >= activity.numberPersonMax) {
    throw new Error('Activity is full');
  }
  return activityRegistrationRepository.registerForAnActivity(
    activityId,
    userId
  );
};
