const express = require('express')
const Routes = express.Router()
const Auth = require('../helpers/auth')
const scoreController = require('../controllers/scoreController')

Routes
    .all('/*', Auth.authInfo)
    .get('/', scoreController.getAllScore)
    .get('/:idUser', scoreController.getByUser)
    .post('/', scoreController.addScore)
    .patch('/:idUser', scoreController.updateScore)

module.exports = Routes