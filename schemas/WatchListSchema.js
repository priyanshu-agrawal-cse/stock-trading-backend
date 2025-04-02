const {Schema} = require("mongoose");

const WatchListSchema = new Schema({
    name: String,
    price:Number,
    percent:String,
   
     isDown:{
        type :  Boolean,
        default : false,
    }
})

module.exports = {WatchListSchema};