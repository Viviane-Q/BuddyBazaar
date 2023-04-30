import Activity from '../../../domain/entities/Activity';
import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';

export default async ({
  activity,
  activityRepository,
}: {
  activity: Activity;
  activityRepository: ActivityRepository;
}): Promise<boolean> => {
  return activityRepository.update(activity);
};
