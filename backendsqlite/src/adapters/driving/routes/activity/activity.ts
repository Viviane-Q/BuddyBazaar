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
  /*
    #swagger.tags = ['Activities']
    #swagger.summary = 'Get all activities with filters'
    #swagger.parameters['obj'] = {
      in: 'query', description:'Query search, start date, end date, number of person max, cost, category',
      schema: {
        $querySearch: 'query',
        $startDate: '2021-01-01T00:00:00.000Z',
        $endDate: '2021-01-01T00:08:00.000Z',
        $numberPersonMax: 1,
        $cost: 1,
        $category: 'category'
      }
    }
    #swagger.responses[200] = {
      schema: {
        $message: 'Activities retrieved',
        $activities: [
          {
            $id: 1,
            $title: 'Activity 1',
            $description: 'Description 1',
            $startDate: '2021-01-01T00:00:00.000Z',
            $endDate: '2021-01-01T00:08:00.000Z',
            $numberPersonMax: 1,
            $cost: 1,
            $place: 'Place 1',
            $longitude: 1,
            $latitude: 1,
            $category: 'category',
            $userId: 1,
            $participants: [1]
          }
        ]
      }
    }
  */
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
    /*
      #swagger.tags = ['Activities']
      #swagger.summary = 'Create a new activity'
      #swagger.parameters['obj'] = {
        in: 'body', description:'Title, description, start date, end date, number of person max, cost, place and category',
        schema: {
          $title: 'Activity 1',
          $description: 'Description 1',
          $startDate: '2021-01-01T00:00:00.000Z',
          $endDate: '2021-01-01T00:08:00.000Z',
          $numberPersonMax: 1,
          $cost: 1,
          $place: 'Place 1',
          $longitude: 1,
          $latitude: 1,
          $category: 'category'
        }
      }
      #swagger.responses[201] = {
        schema: { $message: 'Activity created' }
      }
      #swagger.responses[400] = {
        schema: { $message: 'You must specify the title, description, startDate, endDate, number of person max, cost, place and category' }
      }
    */
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
    /*
      #swagger.tags = ['Activities']
      #swagger.summary = 'Get all activities of a user (owned or registered for)'
      #swagger.responses[200] = {
        schema: {
          $message: 'Activities retrieved',
          $activities: [
            {
              $id: 1,
              $title: 'Activity 1',
              $description: 'Description 1',
              $startDate: '2021-01-01T00:00:00.000Z',
              $endDate: '2021-01-01T00:08:00.000Z',
              $numberPersonMax: 1,
              $cost: 1,
              $place: 'Place 1',
              $longitude: 1,
              $latitude: 1,
              $category: 'category',
              $userId: 1,
              $participants: [1]
            }
          ]
        }
      }
    */
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
    /*
      #swagger.tags = ['Activities']
      #swagger.summary = 'Get an activity by id'
      #swagger.responses[200] = {
        schema: {
          $message: 'Activity retrieved',
          $activity: {
            $id: 1,
            $title: 'Activity 1',
            $description: 'Description 1',
            $startDate: '2021-01-01T00:00:00.000Z',
            $endDate: '2021-01-01T00:08:00.000Z',
            $numberPersonMax: 1,
            $cost: 1,
            $place: 'Place 1',
            $longitude: 1,
            $latitude: 1,
            $category: 'category',
            $userId: 1,
            $participants: [1]
          }
        }
      }
      #swagger.responses[404] = {
        schema: { $message: 'Activity not found' }
      }
    */
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
    /*
      #swagger.tags = ['Activities']
      #swagger.summary = 'Update an activity'
      #swagger.parameters['obj'] = {
        in: 'path', description:'Activity id',
        type: 'integer',
        required: true
      }
      #swagger.parameters['obj'] = {
        in: 'body', description:'Id, title, description, start date, end date, number of person max, cost, place and category',
        schema: {
          $id: 1,
          $title: 'Activity 1',
          $description: 'Description 1',
          $startDate: '2021-01-01T00:00:00.000Z',
          $endDate: '2021-01-01T00:08:00.000Z',
          $numberPersonMax: 1,
          $cost: 1,
          $place: 'Place 1',
          $longitude: 1,
          $latitude: 1,
          $category: 'category'
        }
      }
      #swagger.responses[200] = {
        schema: { $message: 'Activity updated' }
      }
      #swagger.responses[400] = {
        schema: { $message: 'You must specify the id, title, description, startDate, endDate, number of person max, cost, place and category' }
      }
    */
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
    /*
      #swagger.tags = ['Activities']
      #swagger.summary = 'Delete an activity'
      #swagger.parameters['obj'] = {
        in: 'path', description:'Activity id',
        type: 'integer',
        required: true
      }
      #swagger.responses[200] = {
        schema: { $message: 'Activity deleted' }
      }
      #swagger.responses[400] = {
        schema: { $message: 'Activity not deleted' }
      }
    */
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
    /*
      #swagger.tags = ['Activities']
      #swagger.summary = 'Register for an activity'
      #swagger.parameters['obj'] = {
        in: 'path', description:'Activity id',
        type: 'integer',
        required: true
      }
      #swagger.responses[200] = {
        schema: { $message: 'Registration sucessful' }
      }
      #swagger.responses[400] = {
        schema: { $message: 'Registration failed' }
      }
    */
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
    /*
      #swagger.tags = ['Activities']
      #swagger.summary = 'Unregister for an activity'
      #swagger.parameters['obj'] = {
        in: 'path', description:'Activity id',
        type: 'integer',
        required: true
      }
      #swagger.responses[200] = {
        schema: { $message: 'De-registration sucessful' }
      }
      #swagger.responses[400] = {
        schema: { $message: 'De-registration failed' }
      }
    */
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
