import { CustomRequest } from '../../adapters/driving/types/CustomRequest';
import { Actions } from './Actions';
import { Resources } from './Resources';

export default {
  [Resources.ACTIVITY]: {
    [Actions.CREATE]: (req: CustomRequest): boolean => {
      return !!req.user;
    },
  },
};
