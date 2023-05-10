import ActivityRegistrationRepository from '../../../domain/interfaces/repositories/ActivityRegistrationRepository';

export default async ({
  activityId,
  userId,
  activityRegistrationRepository,
}: {
  activityId: number;
  userId: number;
  activityRegistrationRepository: ActivityRegistrationRepository;
}): Promise<boolean> => {
  return activityRegistrationRepository.unregisterForAnActivity(
    activityId,
    userId
  );
};
