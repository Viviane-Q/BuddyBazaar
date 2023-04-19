import user from './user'

const router = require('express').Router()

router.use('/api/users/', user)
router.use(require('./old.user'))

module.exports = router
