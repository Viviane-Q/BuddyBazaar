import { Request, Response, Router } from 'express';
import CodeError from '../../../util/CodeError';
import { CustomRequest } from '../types/CustomRequest';
import ActivityController from '../controllers/ActivityController';
import { Resources } from '../../../core/security/Resources';
import { Actions } from '../../../core/security/Actions';
import can from '../../../core/security/can';

const router = Router();

router.post('/activities', can(Resources.ACTIVITY, Actions.CREATE), async (req: Request, res: Response) => {
  try {
    const result = await ActivityController.createActivity(req as CustomRequest);
    if (!result) {
      res.status(400).json({
        message: 'Activity not created',
      });
    } else {
      res.status(201).json({
        message: 'Activity created',
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

export default router;
