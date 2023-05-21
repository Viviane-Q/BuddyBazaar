import ActivityRepository from '../../../domain/interfaces/repositories/ActivityRepository';
import Activity from '../../../domain/entities/Activity';
import models from '../models';
import { Op, FindOptions } from 'sequelize';

class ActivityRepositorySQLite implements ActivityRepository {
  async getByUserIdAndActivityId(
    activityId: number,
    userId: number
  ): Promise<Activity | null> {
    let activity = await models.activities.findOne({
      include: [
        {
          model: models.activitiesRegistrations,
        },
      ],
      where: {
        id: activityId,
        userId: userId,
      },
    });
    if (!activity) {
      activity = await models.activities.findOne({
        include: [
          {
            model: models.activitiesRegistrations,
            where: { userId, activityId },
          },
        ],
      });
    }
    if (activity) {
      return new Activity(
        activity.id,
        activity.title,
        activity.description,
        activity.startDate,
        activity.endDate,
        activity.numberPersonMax,
        activity.cost,
        activity.place,
        activity.longitude,
        activity.latitude,
        activity.category,
        activity.userId,
        activity.dataValues.activitiesRegistrations?.map(
          (registration: any) => {
            return registration.userId;
          }
        )
      );
    }
    return null;
  }

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
      activity.longitude,
      activity.latitude,
      activity.category,
      activity.userId
    );
  }

  async create(activity: Activity): Promise<Activity | null> {
    const seqActivity = await models.activities.create(activity.toObject());
    if (!seqActivity) {
      return null;
    }
    return new Activity(
      seqActivity.id,
      seqActivity.title,
      seqActivity.description,
      seqActivity.startDate,
      seqActivity.endDate,
      seqActivity.numberPersonMax,
      seqActivity.cost,
      seqActivity.place,
      seqActivity.longitude,
      seqActivity.latitude,
      seqActivity.category,
      seqActivity.userId
    );
  }

  getAll(
    querySearch?: string,
    startDate?: Date,
    endDate?: Date,
    numberPersonMax?: number,
    cost?: number,
    category?: string
  ): Promise<Activity[]> {
    const now = new Date();
    const options: FindOptions = {
      include: [{ model: models.activitiesRegistrations }],
      where: {
        endDate: { [Op.gte]: now },
      },
    };
    if (querySearch) {
      options.where = {
        [Op.or]: [
          { title: { [Op.like]: `%${querySearch}%` } },
          { description: { [Op.like]: `%${querySearch}%` } },
          { place: { [Op.like]: `%${querySearch}%` } },
        ],
      };
    }
    if (startDate && startDate.getTime() > now.getTime()) {
      options.where = {
        ...options.where,
        startDate: { [Op.gte]: startDate },
      };
    }
    if (endDate && endDate.getTime() > now.getTime()) {
      options.where = {
        ...options.where,
        endDate: { [Op.lte]: endDate },
      };
    }
    if (numberPersonMax) {
      options.where = {
        ...options.where,
        numberPersonMax: { [Op.lte]: numberPersonMax },
      };
    }
    if (cost) {
      options.where = {
        ...options.where,
        cost: { [Op.lte]: cost },
      };
    }
    if (category) {
      options.where = {
        ...options.where,
        category,
      };
    }

    const seqActivities = models.activities.findAll(options);
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
        seqActivity.longitude,
        seqActivity.latitude,
        seqActivity.category,
        seqActivity.userId,
        seqActivity.activitiesRegistrations.map((registration: any) => {
          return registration.userId;
        })
      );
    });
  }

  async getAllByUserId(userId: number): Promise<Activity[]> {
    const seqActivities = models.activities.findAll({
      include: [{ model: models.activitiesRegistrations }],
      where: { userId },
    });
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
        seqActivity.longitude,
        seqActivity.latitude,
        seqActivity.category,
        seqActivity.userId,
        seqActivity.activitiesRegistrations.map((registration: any) => {
          return registration.userId;
        })
      );
    });
  }

  async getAllRegisteredByUserId(userId: number): Promise<Activity[]> {
    const seqActivities = models.activities.findAll({
      include: [
        {
          model: models.activitiesRegistrations,
          where: {
            userId,
          },
        },
      ],
    });
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
        seqActivity.longitude,
        seqActivity.latitude,
        seqActivity.category,
        seqActivity.userId,
        seqActivity.activitiesRegistrations.map((registration: any) => {
          return registration.userId;
        })
      );
    });
  }

  async update(activity: Activity): Promise<boolean> {
    const result = await models.activities.update(activity.toObject(), {
      where: { id: activity.id },
    });
    return result[0] === 1;
  }

  async delete(activityId: number): Promise<boolean> {
    const result = await models.activities.destroy({
      where: { id: activityId },
    });
    return result === 1;
  }
}
export default ActivityRepositorySQLite;
