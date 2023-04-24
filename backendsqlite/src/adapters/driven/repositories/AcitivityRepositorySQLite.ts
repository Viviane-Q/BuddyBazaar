import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';
import Activity from '../../../domain/entities/Activity';
class ActivityRepositorySQLite implements ActivityRepository {
  create(activity: Activity): Promise<Activity|null> {
    return Promise.resolve(null);
  }
}
export default ActivityRepositorySQLite;
