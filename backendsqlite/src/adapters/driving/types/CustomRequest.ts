import { Request } from 'express';
import { Services } from '../../config/services';

export interface CustomRequest extends Request {
  context: {
    services: Services;
  };
}
