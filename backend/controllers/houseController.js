const House = require('../models/HouseModel')
const User = require('../models/userModel')
const Comment = require("../models/commentModel")

const houseController={
    getHouse: async (req, res) => {
        try{
            const data = await House.find()
            res.json({
                success: true,
                response:data})
        }catch{
            res.json({
                success: false,
                response:"Error loading Houses"})
        }
    },
        
    uploadHouse: async (req, res) => {
        
        var userId = req.user._id
        var {address, neighborhood, squareMeters, bedrooms, bathrooms, price, garden, photo, photo2} = req.body//destructuring
        
        const newHouse = new House({
            address, 
            neighborhood, 
            userId, 
            squareMeters, 
            bedrooms, 
            bathrooms, 
            price, 
            garden,
            photo,
            photo2,
        })
        try{
            await newHouse.save()
           
            res.json({
                success: true,
                response:"House uploaded"})
        }catch(error){
            res.json({
                success: false,
                response:error})
        }
        
    },

    deleteHouse: async (req, res) =>{
        var id = req.params.id
        try{
            await House.findOneAndDelete({_id: id})
            res.json({
                success: true,
                response: "House Deleted"})
        }catch{
            res.json({
                success: false,
                response:"Error deleting House"})
        }
    },

    modifyHouse: async (req, res) => {
        var id= req.params.id
        var {address, neighborhood, squareMeters, bedrooms, bathrooms, price, garden} = req.body
        
        try{
            const houseMod = await House.findOneAndUpdate(
                {_id:id},
                {address, neighborhood, squareMeters, bedrooms, bathrooms, price, garden}
            )
            
            res.json({
                success: true,
                response: "House modified"
            })
        }catch{
            res.json({
                success: false,
                response:"Error modifying House"})
        }
    },
     getHouseById: async (req, res) =>{
        var id = req.params.id
        try{
            const house = await House.findOne({_id: id})
       
            const user = await User.findOne({_id: house.userId})
            const dataUser={
                name: user.name,
                surname: user.surname,
                mail: user.mail,
                photo: user.photo
            }
            res.json({
                success: true,
                response: {
                    house,
                    dataUser
                }
                
            })
        }catch{
            res.json({
                success: false,
                response: "Error geting house"
            })
        }
    },
    uploadViews: async (req, res) =>{
        var id = req.params.id
        try{
            const house = await House.findOne({_id:id})
            var views = house.views += 1
            await House.updateOne({_id:id},{views})
            res.json({
                success: true,
                response: "viewed"
            })
        }catch(error){
            res.json({
                success: false,
                response: error
            })
        }
    },
    getHouseByUser: async (req, res) =>{

        try{
            const data = await House.find({userId: req.user._id})
            res.json({
                success: true,
                response:data
            })
        }catch(error){
                res.json({
                    success: false,
                    response: error
                })
        }
    },
    getCommentsByHouseId: async (req, res) =>{
        var houseId = req.params.id
        try{
            var comments = await Comment.find({houseId})
            res.json({
                success: true,
                response: comments
            })
        }catch{
            res.json({
                success: false,
                response: "Failed to get comments"
            })
        }
    },
    commentHouse: async (req, res) =>{
      
        var user = req.user.user
        var houseId = req.params.id
        var comment = req.body.newComment
        
        const newComment = new Comment({
            houseId,
            user,
            comment
        })
       
        try{
            await newComment.save()
            res.json({
                success: true, 
                response: "Comment saved"
            })
        
        }catch(error){
            res.json({
                success: false,
                response: error 
            })
        }
    },
    

}



module.exports = houseController