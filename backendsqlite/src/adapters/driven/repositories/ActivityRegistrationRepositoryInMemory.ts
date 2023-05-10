import ActivityRegistrationRepository from '../../../domain/interfaces/repositories/ActivityRegistrationRepository';

class ActivityRegistrationRepositoryInMemory implements ActivityRegistrationRepository {
  private readonly activitiesRegistrations: any[] = [];

  persist(activitiesRegistrations: any[]): void {
    this.activitiesRegistrations.push(...activitiesRegistrations);
  }

  async registerForAnActivity(
    activityId: number,
    userId: number
  ): Promise<boolean> {
    this.activitiesRegistrations.push({ activityId, userId });
    return Promise.resolve(true);
  }

  async countRegisteredForAnActivity(activityId: number): Promise<number> {
    return Promise.resolve(
      this.activitiesRegistrations.filter(
        (activityRegistration) => activityRegistration.activityId === activityId
      ).length
    );
  }

  async unregisterForAnActivity(
    activityId: number,
    userId: number
  ): Promise<boolean> {
    const index = this.activitiesRegistrations.findIndex(
      (activityRegistration) =>
        activityRegistration.activityId === activityId &&
        activityRegistration.userId === userId
    );
    if (index === -1) {
      return Promise.resolve(false);
    }
    this.activitiesRegistrations.splice(index, 1);
    return Promise.resolve(true);
  }

  async getAll(): Promise<any[]> {
    return Promise.resolve(this.activitiesRegistrations);
  }
}
export default ActivityRegistrationRepositoryInMemory;
