const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Cart
const CollectionSchema = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    total:{type:Number,default:0},
    items:[
        {
        item:{type:Schema.Types.ObjectId,ref:'Card'},
        quantity:{type:Number,default:1},
        
    }

    ]

    
})

module.exports= mongoose.model('Collection',CollectionSchema)