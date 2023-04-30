import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';

export default async ({
  activityId,
  activityRepository,
}: {
  activityId: number;
  activityRepository: ActivityRepository;
}): Promise<boolean> => {
  return activityRepository.delete(activityId);
};
