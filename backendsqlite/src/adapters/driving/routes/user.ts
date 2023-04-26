import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import CodeError from '../../../util/CodeError';
import { CustomRequest } from '../types/CustomRequest';

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
        token
      });
    }
  } catch (err) {
    console.log(err);
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

export default router;
