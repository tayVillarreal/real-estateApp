const express = require('express')
const passport = require('../config/passport')
const userController = require('../controllers/userController')
const houseController = require('../controllers/houseController')
const router =express.Router()


router.route('/users')
.get(userController.getUser)
.post(userController.validateUser, userController.uploadUser)

router.route('/users/:id')
.delete(userController.deleteUser)
.put(userController.modifyUser)

router.route('/fullUser')
.get(passport.authenticate('jwt', {session: false}), userController.getFullUser)

router.route('/modifyUser')
.put(passport.authenticate('jwt', {session: false}), userController.modifyUser)

router.route('/login')
.post(userController.logUser)

router.route('/getUser')
.post(userController.getUsersExist)

router.route('/validateToken')
.get(passport.authenticate('jwt', {session: false}), userController.validateToken)

router.route('/houses')
.get(houseController.getHouse)
.put(passport.authenticate('jwt', {session: false}), houseController.uploadHouse)

router.route('/houseByUser')
.get(passport.authenticate('jwt', {session: false}), houseController.getHouseByUser)

router.route('/house/:id')
.get(houseController.getHouseById)
.put(houseController.modifyHouse)

router.route('/modifyUser1')
.put(passport.authenticate('jwt', {session: false}), userController.modifyUser1)

router.route('/viewsHouse/:id')
.get(houseController.uploadViews)

router.route('/sendMail')
.put(userController.getNewPass)


router.route('/houseComment/:id')
.get(houseController.getCommentsByHouseId)
.post(passport.authenticate('jwt', {session: false}), houseController.commentHouse)


module.exports = router