const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
    Collection:{type:Schema.Types.ObjectId,ref:'Collection'},
    name:{type:String, trim:true},
    PowerStats:{type:Number},

})

module.exports=mongoose.model('Card',CardSchema)