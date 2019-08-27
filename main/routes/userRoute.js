const express = require('express')
const Route = express.Router()
const controller = require('../controllers/userController')
const Auth = require('../helpers/auth')
Route
//   .get('/', controller.getUsers)
  .post('/register', controller.postUser)
  .post('/login', controller.getByEmail)
  .post('/getToken', Auth.authInfo, Auth.accessToken)
  .patch('/logout/:idUser', controller.logout)

module.exports = Route