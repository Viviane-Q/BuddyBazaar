interface ActivityRegistrationRepository {
  registerForAnActivity(activityId: number, userId: number): Promise<boolean>;
  countRegisteredForAnActivity(activityId: number): Promise<number>;
  unregisterForAnActivity(activityId: number, userId: number): Promise<boolean>;
}

export default ActivityRegistrationRepository;
