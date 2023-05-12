import { CustomRequest } from '../../adapters/driving/types/CustomRequest';
import { Actions } from './Actions';
import { Resources } from './Resources';
import {
  isValidUser,
  ownsActivity,
  ownsOrRegisteredForActivity,
} from './rbacCheckFunctions';

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
  [Resources.USER]: {
    [Actions.CREATE]: (): boolean => false,
    [Actions.READ]: (): boolean => false,
    [Actions.UPDATE]: (): boolean => false,
    [Actions.DELETE]: (): boolean => false,
    [Actions.READONE]: (req: CustomRequest): boolean => isValidUser(req),
  },
  [Resources.MESSAGE]: {
    [Actions.CREATE]: (data: any): Promise<boolean> =>
      ownsOrRegisteredForActivity(data),
    [Actions.READ]: (data: any): Promise<boolean> =>
      ownsOrRegisteredForActivity(data),
    [Actions.UPDATE]: (): boolean => false,
    [Actions.DELETE]: (): boolean => false,
    [Actions.READONE]: (req: CustomRequest): boolean => isValidUser(req),
  },
};
