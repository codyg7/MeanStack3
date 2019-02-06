var express = require('express')

var router = express.Router()
var meanstacks = require('./api/meanstacks.route')


router.use('/meanstacks', meanstacks);


module.exports = router;