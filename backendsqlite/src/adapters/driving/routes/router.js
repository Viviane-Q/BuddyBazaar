import user from './user';
import activity from './activity/activity';
import message from './message';

const router = require('express').Router();

router.use('/api/users/', user);
router.use('/api/activities/', activity);
router.use('/api/messages/', message);

module.exports = router;
