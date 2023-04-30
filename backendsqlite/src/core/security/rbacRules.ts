import { CustomRequest } from '../../adapters/driving/types/CustomRequest';
import { Actions } from './Actions';
import { Resources } from './Resources';
import { isValidUser, ownsActivity } from './rbacCheckFunctions';

export default {
  [Resources.ACTIVITY]: {
    [Actions.CREATE]: (req: CustomRequest): boolean => isValidUser(req),
    [Actions.READ]: (req: CustomRequest): boolean => isValidUser(req),
    [Actions.UPDATE]: (req: CustomRequest): Promise<boolean> =>
      ownsActivity(req),
    [Actions.DELETE]: (req: CustomRequest): Promise<boolean> =>
      ownsActivity(req),
    [Actions.READONE]: (req: CustomRequest): Promise<boolean> =>
      ownsActivity(req),
  },
};
