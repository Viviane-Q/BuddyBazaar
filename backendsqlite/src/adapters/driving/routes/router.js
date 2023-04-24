import user from './user';
import activity from './activity';

const router = require('express').Router();

router.use('/api/users/', user);
router.use('/api/', activity);

module.exports = router;
