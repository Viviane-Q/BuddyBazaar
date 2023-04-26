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
}
export default ActivityRepositorySQLite;
