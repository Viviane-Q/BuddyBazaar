import Activity from '../../../domain/entities/Activity';
import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';

class ActivityRepositoryInMemory implements ActivityRepository {
  private readonly activities: Activity[] = [];

  persist(activities: Activity[]): void {
    this.activities.push(...activities);
  }

  getById(activityId: number): Promise<Activity | null> {
    return Promise.resolve(
      this.activities.find((activity) => activity.id === activityId) ?? null
    );
  }

  create(activity: Activity): Promise<Activity | null> {
    this.activities.push(activity);
    return Promise.resolve(activity);
  }

  getAll(): Promise<Activity[]> {
    return Promise.resolve(this.activities);
  }

  getAllByUserId(userId: number): Promise<Activity[]> {
    return Promise.resolve(
      this.activities.filter((activity) => activity.userId === userId)
    );
  }

  update(activity: Activity): Promise<boolean> {
    const index = this.activities.findIndex(
      (activityToFind) => activityToFind.id === activity.id
    );
    this.activities[index] = activity;
    return Promise.resolve(true);
  }
}

export default ActivityRepositoryInMemory;
