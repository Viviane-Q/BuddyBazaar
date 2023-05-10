import ActivityRegistrationRepository from '../../../domain/interfaces/repositories/ActivityRegistrationRepository';
import models from '../models';

class ActivityRegistrationRepositorySQLite implements ActivityRegistrationRepository {
  async registerForAnActivity(
    activityId: number,
    userId: number
  ): Promise<boolean> {
    try {
      const res = await models.activitiesRegistrations.create({ activityId, userId });
      return Promise.resolve(!!res);
    } catch (err) {
      return Promise.resolve(false);
    }
  }

  async countRegisteredForAnActivity(activityId: number): Promise<number> {
    return models.activitiesRegistrations.count({ where: { activityId } });
  }

  async unregisterForAnActivity(
    activityId: number,
    userId: number
  ): Promise<boolean> {
    const res = await models.activitiesRegistrations.destroy({
      where: { activityId, userId },
    });
    return Promise.resolve(res > 0);
  }
}
export default ActivityRegistrationRepositorySQLite;
