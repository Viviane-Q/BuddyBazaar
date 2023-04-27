import { CustomRequest } from '../../adapters/driving/types/CustomRequest';
import { Actions } from './Actions';
import { Resources } from './Resources';

export default {
  [Resources.ACTIVITY]: {
    [Actions.CREATE]: (req: CustomRequest): boolean => {
      return !!req.user;
    },
    [Actions.READ]: (req: CustomRequest): boolean => {
      return !!req.user;
    },
    [Actions.UPDATE]: (req: CustomRequest): boolean => {
      return !!req.user;
    },
    [Actions.DELETE]: (req: CustomRequest): boolean => {
      return !!req.user;
    },
    [Actions.READONE]: (req: CustomRequest): boolean => {
      return !!req.user;
    }
  },
};
