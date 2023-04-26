import CreateActivity from '../../../core/usecases/Activity/CreateActivity';
import GetActivitiesByUser from '../../../core/usecases/Activity/GetActivitiesByUser';
import Activity from '../../../domain/entities/Activity';
import CodeError from '../../../util/CodeError';
import { Services } from '../../config/services';
import { CustomRequest } from '../types/CustomRequest';

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

export default { createActivity, getActivitiesByUser };
