import CreateActivity from '../../../core/usecases/Activity/CreateActivity';
import GetActivitiesByUser from '../../../core/usecases/Activity/GetActivitiesByUser';
import Activity from '../../../domain/entities/Activity';
import CodeError from '../../../util/CodeError';
import { Services } from '../../config/services';
import { CustomRequest } from '../types/CustomRequest';
import UpdateActivity from '../../../core/usecases/Activity/UpdateActivity';
import GetActivityById from '../../../core/usecases/Activity/GetActivityById';
import GetActivities from '../../../core/usecases/Activity/GetActivities';

const getActivities = (req: CustomRequest): Promise<Activity[]> => {
  const services = req.context.services as Services;
  return GetActivities({
    activityRepository: services.activityRepository,
    querySearch: req.query.querySearch as string,
    startDate: new Date(req.query.startDate as string),
    endDate: new Date(req.query.endDate as string),
    numberPersonMax: parseInt(req.query.numberPersonMax as string),
    cost: parseInt(req.query.cost as string),
    category: req.query.category as string,
  });
};

const createActivity = (req: CustomRequest): Promise<boolean> => {
  if (
    !(
      'title' in req.body &&
      'description' in req.body &&
      'startDate' in req.body &&
      'endDate' in req.body &&
      'numberPersonMax' in req.body &&
      'cost' in req.body &&
      'place' in req.body &&
      'longitude' in req.body &&
      'latitude' in req.body &&
      'category' in req.body
    )
  ) {
    throw new CodeError(
      'You must specify the title, description, startDate, endDate, number of person max, cost, place and category',
      400
    );
  }
  const {
    title,
    description,
    startDate,
    endDate,
    numberPersonMax,
    cost,
    place,
    longitude,
    latitude,
    category,
  } = req.body;

  const activityToCreate = new Activity(
    undefined,
    title,
    description,
    new Date(startDate),
    new Date(endDate),
    numberPersonMax,
    cost,
    place,
    longitude,
    latitude,
    category,
    req.user.id as number
  );

  const services = req.context.services as Services;
  return CreateActivity({
    activity: activityToCreate,
    activityRepository: services.activityRepository,
  });
};

const getActivitiesByUser = (req: CustomRequest): Promise<Activity[]> => {
  const services = req.context.services as Services;
  return GetActivitiesByUser({
    userId: req.user.id as number,
    activityRepository: services.activityRepository,
  });
};

const getActivityById = (req: CustomRequest): Promise<Activity | null> => {
  const services = req.context.services as Services;
  return GetActivityById({
    activityId: parseInt(req.params.activityId),
    activityRepository: services.activityRepository,
  });
};

const updateActivity = (req: CustomRequest): Promise<boolean> => {
  if (
    !(
      'id' in req.body &&
      'title' in req.body &&
      'description' in req.body &&
      'startDate' in req.body &&
      'endDate' in req.body &&
      'numberPersonMax' in req.body &&
      'cost' in req.body &&
      'place' in req.body &&
      'category' in req.body
    )
  ) {
    throw new CodeError(
      'You must specify the id, title, description, startDate, endDate, number of person max, cost, place and category',
      400
    );
  }
  const {
    id,
    title,
    description,
    startDate,
    endDate,
    numberPersonMax,
    cost,
    place,
    longitude,
    latitude,
    category,
  } = req.body;

  const activityToUpdate = new Activity(
    id,
    title,
    description,
    new Date(startDate),
    new Date(endDate),
    numberPersonMax,
    cost,
    place,
    longitude,
    latitude,
    category,
    req.user.id as number
  );

  const services = req.context.services as Services;
  return UpdateActivity({
    activity: activityToUpdate,
    activityRepository: services.activityRepository,
  });
};

const deleteActivity = (req: CustomRequest): Promise<boolean> => {
  const services = req.context.services as Services;
  return services.activityRepository.delete(parseInt(req.params.activityId));
};

export default {
  getActivities,
  createActivity,
  getActivitiesByUser,
  updateActivity,
  getActivityById,
  deleteActivity,
};
