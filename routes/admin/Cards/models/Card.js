const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
    pack:{type:Schema.Types.ObjectId,ref:'Pack'},
    charId:{type:Number},
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    name:String,
    image:String,
    description:String,
    powerStats:Object
})

module.exports=mongoose.model('Card',CardSchema)