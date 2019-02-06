// Access our newly created Mongoose Model
var MeanStack = require('../models/meanstack.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the To Do List
exports.getMeanstacks = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }
    //Let's create a Try and Catch function 
//that way we have some error handling set. 
//Waiting for the promise
    
try {
    var meanstacks = await MeanStack.paginate(query, options)
    
//Once the Mongoose promise is returned 
//we're going to go ahead and return 
//the To Do List it has produced 

    return meanstack;

} catch (e) {

//If the try didn't work we're going to 
//go ahead and let the users know what kind of 
//Error we have

    throw Error('Oh No! We got an error while Paginating our To-Do Tasks, so sorry!' )
    }

}

exports.createMeanstack = async function(meanstack){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newMeanstack = new MeanStack({
            title: meanstack.title,
            description: meanstack.description,
            date: new Date(),
            status: meanstack.status
        })
    
        try{
    
            // Let's go ahead and save the Meanstack 
    
            var savedMeanstack = await newMeanstack.save()
    
            return savedMeanstack;
        }catch(e){
          
            //if we can't create a Meanstack we want to throw an error 
    
            throw Error("Error while Creating Meanstack")
        }
    }

    exports.updateMeanstack = async function(meanstack){
        var id = meanstack.id
    
        try{
            //Find the old Meanstack Object by the Id
        
            var oldMeanstack = await MeanStack.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the Meanstack")
        }
    
        // If no old Meanstack Object exists return false
    
        if(!oldMeanstack){
            return false;
        }
    
        console.log(oldMeanstack)
    
        //Edit the Meanstack Object
    
        oldMeanstack.title = meanstack.title
        oldMeanstack.description = meanstack.description
        oldMeanstack.status = meanstack.status
    
    
        console.log(oldMeanstack)
    
        try{
            var savedMeanstack = await oldMeanstack.save()
            return savedMeanstack;
        }catch(e){
            throw Error("And Error occured while updating the Meanstack");
        }
    }

    exports.deleteMeanstack = async function(id){
    
        // Delete the Meanstack
    
        try{
            var deleted = await MeanStack.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("Meanstack Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the Meanstack")
        }
    }
