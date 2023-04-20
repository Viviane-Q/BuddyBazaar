import user from './user'

const router = require('express').Router()

router.use('/api/users/', user)

module.exports = router
