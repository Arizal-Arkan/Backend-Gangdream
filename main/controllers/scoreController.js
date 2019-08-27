const scoreModel = require('../models/scoreModels')
const MiscHelper = require('../helpers/helpers')

module.exports = {
    getAllScore: (req, res) => {
        scoreModel.getAllScore()
        .then((result) => {
            MiscHelper.response(res, result)
        })
        .catch((error) => {
            console.log(error)
            MiscHelper.response(res, '', '', error)
        })
    },

    getByUser: (req, res) => {
        idUser = req.params.idUser
        scoreModel.getByUser(idUser)
            .then((result) => {
                const resultdata = result[0]

                MiscHelper.response(res, resultdata)
            })
            .then((error) => {
                console.log(error)
            })
    },

    addScore: (req, res) => {
        const data = {
            idUser: req.body.idUser,
            score: req.body.score,
        }

        scoreModel.addScore(data)
            .then(() => {
                MiscHelper.response(res, data, 201)
            })
            .catch((error) => {
                console.log(error)
                MiscHelper.response(res, error, 400, error)
            })
    },

    updateScore: (req, res) => {
        const idUser = req.params.idUser
        const data = {
            score: req.body.score,
        }

        scoreModel.updateScore(idUser,data)
            .then(() => {
                MiscHelper.response(res, data)
            })
            .catch((error) => {
                console.log(error)
                MiscHelper.response(res, error, 400, error)
            })
    }
}