import { Response, Request, NextFunction } from 'express';
import { CustomRequest } from '../../adapters/driving/types/CustomRequest';
import { Actions } from './Actions';
import { Resources } from './Resources';
import rbacRules from './rbacRules';
import CodeError from '../../util/CodeError';
import { Services } from '../../adapters/config/services';

const can =
  (resource: Resources, action: Actions) =>
    async (req: Request, res: Response, next: NextFunction) => {
      /*
        #swagger.responses[404] = {
          schema: {
            $message: 'User not found'
          }
        }
        #swagger.responses[401] = {
          schema: {
            $message: 'You are not authorized to do this action'
          }
        }
      */
      const user = await getUserFromToken(
      req.headers.token as string,
      (req as CustomRequest).context.services
      );
      if (!user) {
        throw new CodeError('User not found', 404);
      }
      (req as CustomRequest).user = user.toObject();
      const rbacCheck = await rbacRules[resource][action](req as CustomRequest);
      if (!rbacCheck) {
        res.status(401).json({
          message: 'You are not authorized to do this action',
        });
      } else {
        next();
      }
    };

const socketCan = async (resource: Resources, action: Actions, data: any) => {
  const user = await getUserFromToken(
    data.token,
    (data as CustomRequest).context.services
  );
  if (!user) {
    throw new CodeError('User not found', 404);
  }
  (data as CustomRequest).user = user.toObject();
  const rbacCheck = await rbacRules[resource][action](data);
  if (!rbacCheck) {
    throw new CodeError('You are not authorized to do this action', 401);
  } else {
    return data;
  }
};

const getUserFromToken = (token: string, services: Services) => {
  const { TOKENSECRET } = process.env;
  const { encryption, userRepository } = services;
  if (!token) {
    throw new CodeError('You must specify the token', 400);
  }
  const email = encryption.verify(token, TOKENSECRET as string);
  if (!email) {
    throw new CodeError('Invalid token', 401);
  }
  return userRepository.getByEmail(email as string);
};

export { can, socketCan };
