const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Categories
const PackSchema = new Schema({
    name:{type:String,trim:true},
    owner:{type:Schema.Types.ObjectId,ref:'User'}
    
   

    
})

module.exports= mongoose.model('Pack',PackSchema)