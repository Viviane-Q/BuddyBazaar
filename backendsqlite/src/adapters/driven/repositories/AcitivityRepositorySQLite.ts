import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';
import Activity from '../../../domain/entities/Activity';
import models from '../models';
class ActivityRepositorySQLite implements ActivityRepository {
  create(activity: Activity): Promise<Activity | null> {
    return models.activities.create(activity);
  }

  getAll(): Promise<Activity[]> {
    throw new Error('Method not implemented.');
  }

  async getAllByUserId(userId: number): Promise<Activity[]> {
    const seqActivities = models.activities.findAll({ where: { userId } });
    return seqActivities.map((seqActivity: any) => {
      return new Activity(
        seqActivity.id,
        seqActivity.title,
        seqActivity.description,
        seqActivity.startDate,
        seqActivity.endDate,
        seqActivity.numberPersonMax,
        seqActivity.cost,
        seqActivity.place,
        seqActivity.category,
        seqActivity.userId
      );
    });
  }

  update(activity: Activity): Promise<Activity | null> {
    throw new Error('Method not implemented.');
  }
}
export default ActivityRepositorySQLite;
