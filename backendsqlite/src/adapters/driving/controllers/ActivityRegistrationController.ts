import RegisterForAnActivity from '../../../core/usecases/ActivityRegistration/RegisterForAnActivity';
import UnregisterForAnActivity from '../../../core/usecases/ActivityRegistration/UnregisterForAnActivity';
import { Services } from '../../config/services';
import { CustomRequest } from '../types/CustomRequest';
import CodeError from '../../../util/CodeError';

const registerForAnActivity = async (req: CustomRequest): Promise<boolean> => {
  const services = req.context.services as Services;
  try {
    const res = await RegisterForAnActivity({
      activityId: parseInt(req.params.activityId),
      userId: req.user.id as number,
      activityRepository: services.activityRepository,
      activityRegistrationRepository: services.activityRegistrationRepository,
    });
    return res;
  } catch (error) {
    throw new CodeError((error as Error).message, 400);
  }
};

const unregisterForAnActivity = (req: CustomRequest): Promise<boolean> => {
  const services = req.context.services as Services;
  return UnregisterForAnActivity({
    activityId: parseInt(req.params.activityId),
    userId: req.user.id as number,
    activityRegistrationRepository: services.activityRegistrationRepository,
  });
};

export default {
  registerForAnActivity,
  unregisterForAnActivity,
};
