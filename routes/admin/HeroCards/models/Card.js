const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
    Collection:{type:Schema.Types.ObjectId,ref:'Collection'},
    name:String,
    price:Number,
    image:String,
    description:String
})

module.exports=mongoose.model('Card',CardSchema)