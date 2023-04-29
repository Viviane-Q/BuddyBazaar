import Activity from '../../../domain/entities/Activity';
import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';

export default ({
  activityId,
  activityRepository,
}: {
    activityId: number;
  activityRepository: ActivityRepository;
}): Promise<Activity | null> => {
  return activityRepository.getById(activityId);
};
