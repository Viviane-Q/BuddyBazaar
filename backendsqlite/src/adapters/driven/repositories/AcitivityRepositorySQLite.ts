import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';
import Activity from '../../../domain/entities/Activity';
import models from '../models';
class ActivityRepositorySQLite implements ActivityRepository {
  async getById(activityId: number): Promise<Activity | null> {
    const activity = await models.activities.findByPk(activityId);
    if (!activity) {
      return null;
    }
    return new Activity(
      activity.id,
      activity.title,
      activity.description,
      activity.startDate,
      activity.endDate,
      activity.numberPersonMax,
      activity.cost,
      activity.place,
      activity.category,
      activity.userId
    );
  }

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

  async update(activity: Activity): Promise<boolean> {
    const result = await models.activities.update(activity.toObject(), {
      where: { id: activity.id },
    });
    return result[0] === 1;
  }
}
export default ActivityRepositorySQLite;
