const {Schema} = require("mongoose");

const OrdersSchema = new Schema({
    name: String,
    price: Number,
    qty:Number,
    mode : String,
    //  isDown:{
    //     type :  Boolean,
    //     default : false,
    // }
})

module.exports = {OrdersSchema};