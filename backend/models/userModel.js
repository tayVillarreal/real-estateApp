const mongoose = require('mongoose')
const { required } = require('@hapi/joi')

const userSchema = new mongoose.Schema({
    user: {type:String, required:true, 
        validate:{
            validator: async user => await User.find({user}).countDocuments()===0,
            message: () => "That username is already taken"
        }
    },
    photo:{type:String, default:"https://www.seoptimer.com/es/blog/wp-content/uploads/2016/05/huevo.png"},
    password:{type:String, required:true},
    name:{type:String, required:true},
    surname:{type:String, required:true},
    role:{type:String, required: true},
    mail:{type:String, required: true,
        validate:{
            validator: async mail => await User.find({mail}).countDocuments()===0,
            message: () => "That email is already used"
        }
    },
    country:{type:String, default:"undefined"},
   
})

const User = mongoose.model('user',userSchema)

module.exports = User