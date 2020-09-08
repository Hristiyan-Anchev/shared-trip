const mongoose = require("mongoose");
const {Schema} = mongoose;
const validators = require("../misc/validators");
const userSchema = new Schema({
    email:{
        required:true,
        type:String,
        validate:{
            validator:validators.isValidEmail,
            message:validators.returnDBError
        }
    },
    password:{
        required:true,
        type:String
    },
    trippsHistory:[{
        type:mongoose.Types.ObjectId,
        ref:"tripp"
    }]
});
const tripSchema = new Schema({
    trippRoute:{
        type:String,
        required:true
    },
    dateTime:{
        type:String,
        required:true
    },
    availableSeats:{
        type:Number,
    },
    seats:{
        type:Number,
        required:true,
        min:1,
        max:6,
        validate:{
            validator:validators.validateSeats,
            message:validators.returnDBError
        }
    },
    description:{
        type:String,
        required:true
    },

    imageURL:{
        type:String,
        required:true,
        validate:{
            validator:validators.isValidURL,
            message:validators.returnDBError
        }
    },
    buddies:[{
        type:String,
        ref:"user"
    }],
    creatorId:{
        type:String,
        required:true
    }
});

tripSchema.pre("save",function(next){
    console.log("SAVED");
    this.availableSeats = this.seats - this.buddies.length;
    next();
});

module.exports = {
    userSchema,
    tripSchema


}