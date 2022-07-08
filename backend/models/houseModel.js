const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
    address: {type:String, required:true},
    neighborhood:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    squareMeters:{type:Number, require: true},
    bedrooms:{type:Number, required:true},
    bathrooms:{type:Number, required:true},
    price:{type:Number, required:true},
    garden:{type:Boolean, required: true},
    date:{type:Date, default: Date.now},
    photo:{type:String, required:true},
    photo2:{type:String, required:true},
    views:{type:Number,default:0}
})

const House = mongoose.model('house',houseSchema)

module.exports = House