const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


const User = require('../models/userModel')


//strategy

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETORKEY
}, (payload, done) => {
    User.findById(payload._doc._id)
        .then(user => {
            if(!user){
                return done(null, false)
            }else{
                return done(null, user)
            }
        })
        .catch(error =>{
            return done(error, false)
        })
}))