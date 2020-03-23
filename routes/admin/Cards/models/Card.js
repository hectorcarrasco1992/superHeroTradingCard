const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
    pack:{type:Schema.Types.ObjectId,ref:'Collection'},
    charId:{type:Number,unique:true},
    name:String,
    image:String,
    description:String,
    powerStats:Object
})

module.exports=mongoose.model('Card',CardSchema)