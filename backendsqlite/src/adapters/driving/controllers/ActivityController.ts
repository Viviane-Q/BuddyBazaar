import CreateActivity from '../../../core/usecases/Activity/CreateActivity';
import Activity from '../../../domain/entities/Activity';
import CodeError from '../../../util/CodeError';
import { Services } from '../../config/services';
import { CustomRequest } from '../types/CustomRequest';

const createActivity = (req: CustomRequest): Promise<boolean> => {
  if (!('title' in req.body && 'description' in req.body && 'dateTime' in req.body && 'numberPersonMax' in req.body && 'cost' in req.body && 'place' in req.body && 'category' in req.body && 'duration')) {
    throw new CodeError('You must specify the title, description, dateTime, number of person max, cost, place, category and duration', 400);
  }
  const { title, description, dateTime, numberPersonMax, cost, place, category, duration } = req.body;

  // if (!validPassword(password)) throw new CodeError('Weak password!', 400);s

  const activityToCreate = new Activity(undefined, title, description, dateTime, numberPersonMax, cost, place, category, duration);

  const services = req.context.services as Services;
  return CreateActivity({
    activity: activityToCreate,
    activityRepository: services.activityRepository
  });
};

export default { createActivity };
