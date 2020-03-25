const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Categories
const PackSchema = new Schema({
    name:{type:String,trim:true},
    
   

    
})

module.exports= mongoose.model('Pack',PackSchema)