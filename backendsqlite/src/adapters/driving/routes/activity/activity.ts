import { Request, Response, Router } from 'express';
import CodeError from '../../../../util/CodeError';
import { CustomRequest } from '../../types/CustomRequest';
import ActivityController from '../../controllers/ActivityController';
import ActivityRegistrationController from '../../controllers/ActivityRegistrationController';
import { Resources } from '../../../../core/security/Resources';
import { Actions } from '../../../../core/security/Actions';
import { can } from '../../../../core/security/can';
import message from './message';

const router = Router({ mergeParams: true });

router.use('/:activityId/messages', message);

router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await ActivityController.getActivities(
      req as CustomRequest
    );
    res.status(200).json({
      message: 'Activities retrieved',
      activities: activities.map((activity) => activity.toObject()),
    });
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

router.post(
  '/',
  can(Resources.ACTIVITY, Actions.CREATE),
  async (req: Request, res: Response) => {
    try {
      const result = await ActivityController.createActivity(
        req as CustomRequest
      );
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
  }
);

router.get(
  '/by-user',
  can(Resources.ACTIVITY, Actions.READ),
  async (req: Request, res: Response) => {
    try {
      const activities = await ActivityController.getActivitiesByUser(
        req as CustomRequest
      );
      res.status(200).json({
        message: 'Activities retrieved',
        activities: activities.map((activity) => activity.toObject()),
      });
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
  }
);

router.get(
  '/:activityId',
  can(Resources.ACTIVITY, Actions.READONE),
  async (req: Request, res: Response) => {
    try {
      const activity = await ActivityController.getActivityById(
        req as CustomRequest
      );
      if (!activity) {
        res.status(404).json({
          message: 'Activity not found',
        });
      } else {
        res.status(200).json({
          message: 'Activity retrieved',
          activity: activity.toObject(),
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
  }
);

router.put(
  '/:activityId',
  can(Resources.ACTIVITY, Actions.UPDATE),
  async (req: Request, res: Response) => {
    try {
      const result = await ActivityController.updateActivity(
        req as CustomRequest
      );
      if (!result) {
        res.status(400).json({
          message: 'Activity not updated',
        });
      } else {
        res.status(200).json({
          message: 'Activity updated',
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
  }
);

router.delete(
  '/:activityId',
  can(Resources.ACTIVITY, Actions.DELETE),
  async (req: Request, res: Response) => {
    try {
      const result = await ActivityController.deleteActivity(
        req as CustomRequest
      );
      if (!result) {
        res.status(400).json({
          message: 'Activity not deleted',
        });
      } else {
        res.status(200).json({
          message: 'Activity deleted',
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
  }
);

router.post(
  '/:activityId/register',
  can(Resources.ACTIVITY, Actions.READ),
  async (req: Request, res: Response) => {
    try {
      const result = await ActivityRegistrationController.registerForAnActivity(
        req as CustomRequest
      );
      if (!result) {
        res.status(400).json({
          message: 'Registration failed',
        });
      } else {
        res.status(200).json({
          message: 'Registration successful',
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
  }
);

router.post(
  '/:activityId/unregister',
  can(Resources.ACTIVITY, Actions.READ),
  async (req: Request, res: Response) => {
    try {
      const result =
        await ActivityRegistrationController.unregisterForAnActivity(
          req as CustomRequest
        );
      if (!result) {
        res.status(400).json({
          message: 'De-registration failed',
        });
      } else {
        res.status(200).json({
          message: 'De-registration successful',
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
  }
);

export default router;
