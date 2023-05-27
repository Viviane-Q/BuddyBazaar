import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import CodeError from '../../../util/CodeError';
import { CustomRequest } from '../types/CustomRequest';
import { Resources } from '../../../core/security/Resources';
import { Actions } from '../../../core/security/Actions';
import { can } from '../../../core/security/can';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const result = await UserController.registerUser(req as CustomRequest);
    if (!result) {
      res.status(400).json({
        message: 'User not registered',
      });
    } else {
      res.status(201).json({
        message: 'User registered',
      });
    }
  } catch (err) {
    if (err instanceof CodeError) {
      res.status(err.code).json({
        message: err.message,
      });
    } else if ((err as Error).name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({
        message: 'Email already registered',
      });
    } else {
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
});

router.post('/signin', async (req: Request, res: Response) => {
  try {
    const token = await UserController.signInUser(req as CustomRequest);
    if (!token) {
      res.status(403).json({
        message: 'Wrong email or password',
      });
    } else {
      res.status(200).json({
        message: 'User signed in',
        token,
      });
    }
  } catch (err) {
    if (err instanceof CodeError) {
      res.status(err.code).json({
        message: err.message,
      });
    } else {
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
});

router.get(
  '/me',
  can(Resources.USER, Actions.READONE),
  async (req: Request, res: Response) => {
    /*
      #swagger.tags = ['Users']
      #swagger.summary = 'Get user information'
      #swagger.responses[200] = {
        schema: {
          $message: 'User found',
          $user: {
            $id: 1,
            $name: 'John Doe',
            $email: 'John.Doe@acme.com'
          }
        }
      }
    */
    res.status(200).json({
      message: 'User found',
      user: (req as CustomRequest).user,
    });
  }
);

export default router;
