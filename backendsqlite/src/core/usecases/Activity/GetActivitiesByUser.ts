import Activity from '../../../domain/entities/Activity';
import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';

export default ({
  userId,
  activityRepository,
}: {
  userId: number;
  activityRepository: ActivityRepository;
}): Promise<Activity[]> => {
  return activityRepository.getAllByUserId(userId);
};
