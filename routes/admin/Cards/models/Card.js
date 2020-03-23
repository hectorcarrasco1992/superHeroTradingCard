const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
    collection:{type:Schema.Types.ObjectId,ref:'Collection'},
    name:String,
    image:String,
    description:String,
    powerStats:String
})

module.exports=mongoose.model('Card',CardSchema)