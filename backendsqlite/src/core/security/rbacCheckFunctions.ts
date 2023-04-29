import { CustomRequest } from '../../adapters/driving/types/CustomRequest';

const isValidUser = (req: CustomRequest) => !!req.user;
const ownsActivity = async (req: CustomRequest) => {
  const activityId = parseInt(req.params.id);
  const activity = await req.context.services.activityRepository.findById(activityId);
  return req.user.id === activity?.userId;
};

export {
  isValidUser,
  ownsActivity,
};
