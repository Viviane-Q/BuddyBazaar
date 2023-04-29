import CreateActivity from '../../../core/usecases/Activity/CreateActivity';
import GetActivitiesByUser from '../../../core/usecases/Activity/GetActivitiesByUser';
import Activity from '../../../domain/entities/Activity';
import CodeError from '../../../util/CodeError';
import { Services } from '../../config/services';
import { CustomRequest } from '../types/CustomRequest';
import UpdateActivity from '../../../core/usecases/Activity/UpdateActivity';
import GetActivityById from '../../../core/usecases/Activity/GetActivityById';

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
    activityId: parseInt(req.params.id),
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
    category,
    req.user.id as number
  );

  const services = req.context.services as Services;
  return UpdateActivity({
    activity: activityToUpdate,
    activityRepository: services.activityRepository,
  });
};

export default {
  createActivity,
  getActivitiesByUser,
  updateActivity,
  getActivityById,
};
