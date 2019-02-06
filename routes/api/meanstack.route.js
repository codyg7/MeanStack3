var express = require('express')

var router = express.Router()

// Getting the Meanstack Controller that we just created

var MeanStackController = require('../../controllers/meanstack.controller.js');


// Map each API to the Controller FUnctions

router.get('/', MeanStackController.getMeanstacks)

router.post('/', MeanStackController.createMeanstack)

router.put('/', MeanStackController.updateMeanstack)

router.delete('/:id',MeanStackController.removeMeanstack)


// Export the Router

module.exports = router;