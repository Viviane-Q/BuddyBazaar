import { Request, Response, Router } from 'express';
import CodeError from '../../../../util/CodeError';
import { CustomRequest } from '../../types/CustomRequest';
import { Resources } from '../../../../core/security/Resources';
import { Actions } from '../../../../core/security/Actions';
import { can } from '../../../../core/security/can';
import MessageController from '../../controllers/MessageController';

const router = Router({ mergeParams: true });

router.get(
  '/',
  can(Resources.MESSAGE, Actions.READ),
  async (req: Request, res: Response) => {
    try {
      const messages = await MessageController.getMessages(
        req as CustomRequest
      );
      res.status(200).json({
        message: 'Messages retrieved',
        messages: messages.map((msg) => msg.toObject()),
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

export default router;
