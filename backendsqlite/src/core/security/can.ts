import { Response, Request, NextFunction } from 'express';
import { CustomRequest } from '../../adapters/driving/types/CustomRequest';
import { Actions } from './Actions';
import { Resources } from './Resources';
import rbacRules from './rbacRules';
import CodeError from '../../util/CodeError';

const can =
  (resource: Resources, action: Actions) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.token;
      const { TOKENSECRET } = process.env;
      const { encryption, userRepository } = (req as CustomRequest).context.services;
      if (!token) {
        throw new CodeError('You must specify the token', 400);
      }
      const email = encryption.verify(token as string, TOKENSECRET as string);
      if (!email) {
        throw new CodeError('Invalid token', 401);
      }
      const user = await userRepository.getByEmail(email as string);
      if (!user) {
        throw new CodeError('User not found', 404);
      }
      (req as CustomRequest).user = user;
      if (!rbacRules[resource][action](req as CustomRequest)) {
        res.status(401).json({
          message: 'You are not authorized to do this action',
        });
      } else {
        next();
      }
    };

export default can;
