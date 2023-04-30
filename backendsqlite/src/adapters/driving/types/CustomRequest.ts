import { Request } from 'express';
import { Services } from '../../config/services';
import User from '../../../domain/entities/User';

export interface CustomRequest extends Request {
  context: {
    services: Services;
  };
  user: User;
}
