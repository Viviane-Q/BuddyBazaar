import Activity from '../../../domain/entities/Activity';
import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';

class ActivityRepositoryInMemory implements ActivityRepository {
  private readonly activities: Activity[] = [];

  persist(activities: Activity[]): void {
    this.activities.push(...activities);
  }

  create(activity: Activity): Promise<Activity|null> {
    this.activities.push(activity);
    return Promise.resolve(activity);
  }
}

export default ActivityRepositoryInMemory;
