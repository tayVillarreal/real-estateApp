const User = require('../models/userModel')
const Joi = require('@hapi/joi')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')


var transport = nodeMailer.createTransport({
    port:465, 
    host:"smtp.gmail.com",
    auth: {
        pass: "123456789Emi",
        user: "emiruffini5@gmail.com"
    },
    tls: { rejectUnauthorized: false }
})

const userController={
    getUser: async (req, res) => {
        try{
            const data = await User.find()
            res.json({
                success: true,
                response:data})
        }catch{
            res.json({
                success: false,
                response:"Error loading users"})
        }
    },
        
    uploadUser: async (req, res) => {

        let {user, password,name, surname,mail,role} = req.body//destructuring
        let error = false
        const passwordHashed = bcryptjs.hashSync(password, 10)
        
        const newUser = new User({
            user: user.trim(),
            password: passwordHashed,
            name: name.trim().charAt(0).toUpperCase() + name.slice(1),
            surname: surname.trim().charAt(0).toUpperCase() + surname.slice(1),
            mail: mail.trim(),
            role
        })
        try{
            
            const res = await newUser.save()
            
        }catch (err){
            error = err
        }finally{
            if(error){
                res.json({
                    success: false,
                    response: error
                })
            }else{
                jwt.sign({...newUser}, process.env.SECRETORKEY, {}, (error, token)=>{
                    if(error){
                        res.json({success:false, response: "Something went wrong"})
                    }else{
                        res.json({success: true, response:{
                            token,
                            name: newUser.name,
                            photo: newUser.photo,
                            role: newUser.rol
                            }
                        })
                    }
                })
            }
        }
        
    },
    validateUser: (req, res, next) =>{
        const schema = Joi.object({
            user: Joi.string().min(2).max(40).trim().required(),
            photo: Joi.optional(),
            password: Joi.string().required().pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,60}/, "password").trim(),
            passwordValidation: Joi.ref('password'),
            name: Joi.string().min(2).max(40).trim().required(),
            surname: Joi.string().min(2).max(40).trim().required(),
            mail: Joi.string().email().required().trim(),
            country: Joi.optional(),
            role:Joi.string().min(2).max(40).trim().required()
        })
        const validation = schema.validate(req.body)
        if (validation.error !== undefined){
            res.json({
                success: false,
                error:"Some fields are invalid, please fix them.",
                message:validation.error
            })
        }else{
            next()
        }
        
    },

    deleteUser: async (req, res) =>{
        var id = req.params.id
        try{
            await User.findOneAndDelete({_id: id})
            res.json({
                success: true,
                response: "User Deleted"})
        }catch{
            res.json({
                success: false,
                response:"Error deleting user"})
        }
    },

    /* modifyUser: async (req, res) => {
        var id= req.user._id
        var {name, photo, surname, role, country} = req.body

        try{
            
            await User.updateOne(
                {_id:id},{name: name.trim().charAt(0).toUpperCase() + name.slice(1),
                    surname: surname.trim().charAt(0).toUpperCase() + surname.slice(1),
                    role,
                    country: country.trim().charAt(0).toUpperCase() + country.slice(1),
                    photo: photo.trim()}
                
            )
 
            res.json({
                success: true,
                response: {
                    name,
                    photo,
                    role
                }
            })
            
        }catch{
            res.json({
                success: false,
                response:"Error modifying user"
            })
        }
    } */modifyUser: async (req, res) => {
        
        var id= req.user._id
        var {name, surname, role, country} = req.body
        const image = req.files.photo
        var extension = req.files.photo.mimetype

        if (extension === 'image/png') {
            extension = 'png'
        } else if (extension === 'image/jpeg') {
            extension = 'jpeg'
        } else {
            return alert('ponga otra extension de imagen')
        }

        const nameFile = `${id}.${extension}`

        const serverURL = `${__dirname}/uploads/${nameFile}`

        // dirección de archivo local, CAMBIAR A HEROKU
        const urlFile = `http://localhost:4000/uploads/${nameFile}`

        image.mv(serverURL)

        try{
            
            await User.updateOne(
                {_id:id},{name: name.trim().charAt(0).toUpperCase() + name.slice(1),
                    surname: surname.trim().charAt(0).toUpperCase() + surname.slice(1),
                    role,
                    country: country.trim().charAt(0).toUpperCase() + country.slice(1),
                    photo: urlFile
                }
                
            )
 
            const user = await User.findOne({_id:id})
            
                    res.json({success: true, response:{
                        
                        name: user.name,
                        photo: urlFile,
                        role: user.role
                        }
                    })
             
            
        }catch{
            res.json({
                success: false,
                response:"Error modifying user"
            })
        }
    },

    modifyUser1: async (req, res) => {
        
        var id= req.user._id
        var {name, surname, role, country} = req.body

        try{
            await User.updateOne(
                {_id:id},{name: name.trim().charAt(0).toUpperCase() + name.slice(1),
                    surname: surname.trim().charAt(0).toUpperCase() + surname.slice(1),
                    role,
                    country: country.trim().charAt(0).toUpperCase() + country.slice(1),
                }
                
            )

            const user = await User.findOne({_id:id})
            
                    res.json({success: true, response:{
                        
                        name: user.name,
                        photo: user.photo,
                        role: user.role
                    }})
                    
        
        }catch{
            res.json({
                success: false,
                response:"Error modifying user"
            })
        }
    },

    logUser: async (req, res) => {
        var {user, password } = req.body
        
        const userExist = await User.findOne({user})
        if (!userExist){
            res.json({success: false, response: "The username or password are incorrect"})
        }else{
            const passwordMatches = bcryptjs.compareSync(password, userExist.password)
            if (!passwordMatches){
                res.json({success: false, response: "The username or password are incorrect"})
            }else{
                jwt.sign({...userExist}, process.env.SECRETORKEY, {}, (error, token)=>{
                    if(error){
                        res.json({success:false, response: "Something went wrong"})
                    }else{
                        res.json({success: true, response:{
                            token,
                            name: userExist.name,
                            photo: userExist.photo,
                            role: userExist.role
                            }
                        })
                    }
                })
                
            } 
        }
    },
    validateToken: (req,res) =>{
        const name = req.user.name
        const photo = req.user.photo
        const role = req.user.role
        res.json({
            success: true, 
            response: {name, photo, role}
        })
    }, 
    getUsersExist: async (req,res) =>{
        
        const user = req.body.user
        const userExist = await User.findOne({user})
        if (userExist){
            res.json({
                success:true
            })
        }else{
            res.json({
                success:false
            })
        }
    },
    getFullUser: async (req, res) =>{
        const id = req.user._id
        try{
            const user = await User.findOne({_id:id})
            
            const userToSend = {
                name: user.name,
                surname: user.surname,
                country: user.country,
                mail: user.mail,
                photo: user.photo,
                user: user.user,
                role: user.role
            }
            res.json({
                success: true,
                response: {
                    userToSend
                }
            })
        }catch{
            res.json({
                success: false,
                response:"Error geting user"})
        }
    },
    getNewPass: async (req, res) =>{
        mailSent = req.body.mail

        try{
            
            await User.findOne({mail:mailSent})
            
            var length = 8
            var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            var newPass = ""
            for (var i = 0, n = charset.length; i < length; ++i) {
                newPass += charset.charAt(Math.floor(Math.random() * n));
            }
            const passwordHashed = bcryptjs.hashSync(newPass, 10)
            
                const user = await User.findOneAndUpdate({mail: mailSent}, {password: passwordHashed})
             
                var mailOptions = {
                    from: "HouseMuv <notresponse@notreply.com>",
                    sender: "HouseMuv <notresponse@notreply.com>",
                    to: `${user.mail}`,
                    subject: "New Password",
                    html:  `<div>
                    <h1>This is your new password:${newPass}, continue using HouseMuv :)</h1>
                    <h2>Please sign up again<h2>        
                    </>`,
                }
                transport.sendMail(mailOptions, (error, info) => {
                  
                    res.send("email enviado")
                })

           

     }catch(error){
            res.json({
                success:false,
                response: "Error getting account"
            })
        }
    }
}



module.exports = userController