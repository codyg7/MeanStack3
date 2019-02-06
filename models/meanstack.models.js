// We need to be able to access the Service 
//that we just created so let's pull that in

var MeanstackService = require('../services/meanstack.service.js');

// Make sure to save the context of 
//this module inside the _this variable

_this = this

exports.getMeanstacks = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var meanstacks = await MeanstackService.getMeanstacks({}, page, limit)
            
    // Return the meanstacks list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: meanstacks, message: "Succesfully Meanstacks Recieved"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }

    exports.createMeanstack = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
    
        var meanstack = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        }
    
        try{
            
    // Calling the Service function 
    //with the new object from the Request Body
        
            var createdMeanstack = await MeanstackService.createMeanstack(meanstack)
            return res.status(201).json({status: 201, data: createdMeanstack, message: "Succesfully Created MeanStack"})
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
    return res.status(400).json({status: 400, message: "Meanstack Creation was Unsuccesfull, I am sorry :( "})
        }
    }

    exports.updateMeanstack = async function(req, res, next){

        // Id is necessary for the update
    
        if(!req.body._id){
            return res.status(400).json({status: 400, message: "Id must be present"})
        }
    
        var id = req.body._id;
    
        console.log(req.body)
    
        var meanstack = {
            id,
            title: req.body.title ? req.body.title : null,
            description: req.body.description ? req.body.description : null,
            status: req.body.status ? req.body.status : null
        }
    
        try{
            var updatedMeanstack = await MeanstackService.updateMeanstack(meanstack)
            return res.status(200).json({status: 200, data: updatedMeanstack, message: "Succesfully Updated Tod"})
        }catch(e){
            return res.status(400).json({status: 400 , message: e.message})
        }

    }

    exports.removeMeanstack = async function(req, res, next){

        var id = req.params.id;
    
        try{
            var deleted = await MeanstackService.deleteMeanstack(id)
            return res.status(204).json({status:204, message: "Succesfully Meanstack Deleted"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }
    
    