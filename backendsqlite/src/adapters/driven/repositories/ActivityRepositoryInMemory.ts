import Activity from '../../../domain/entities/Activity';
import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';

class ActivityRepositoryInMemory implements ActivityRepository {
  private readonly activities: Activity[] = [];

  persist(activities: Activity[]): void {
    this.activities.push(...activities);
  }

  clear(): void {
    this.activities.splice(0, this.activities.length);
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

  getAll(
    querySearch?: string,
    startDate?: Date,
    endDate?: Date,
    numberPersonMax?: number,
    cost?: number,
    category?: string
  ): Promise<Activity[]> {
    let activities = this.activities;
    if (category) {
      activities = activities.filter(
        (activity) => activity.category === category
      );
    }
    if (querySearch) {
      activities = activities.filter(
        (activity) =>
          activity.title.includes(querySearch) ||
          activity.description.includes(querySearch)
      );
    }
    if (cost) {
      activities = activities.filter((activity) => activity.cost <= cost);
    }
    if (startDate) {
      activities = activities.filter(
        (activity) => activity.startDate >= startDate
      );
    }
    if (endDate) {
      activities = activities.filter(
        (activity) => activity.endDate.getTime() <= endDate.getTime()
      );
    }
    return Promise.resolve(activities);
  }

  getAllByUserId(userId: number): Promise<Activity[]> {
    return Promise.resolve(
      this.activities.filter((activity) => activity.userId === userId)
    );
  }

  getAllRegisteredByUserId(userId: number): Promise<Activity[]> {
    return Promise.resolve(
      this.activities.filter((activity) =>
        activity.participants.includes(userId)
      )
    );
  }

  update(activity: Activity): Promise<boolean> {
    const index = this.activities.findIndex(
      (activityToFind) => activityToFind.id === activity.id
    );
    this.activities[index] = activity;
    return Promise.resolve(true);
  }

  delete(activityId: number): Promise<boolean> {
    const index = this.activities.findIndex(
      (activityToFind) => activityToFind.id === activityId
    );
    if (index === -1) return Promise.resolve(false);
    this.activities.splice(index, 1);
    return Promise.resolve(true);
  }

  getByUserIdAndActivityId(activityId: number, userId: number): Promise<Activity | null> {
    throw new Error('Method not implemented.');
  }
}

export default ActivityRepositoryInMemory;
