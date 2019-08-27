const userModels = require('../models/userModels')
const MiscHelper = require('../helpers/helpers')
const jwt = require('jsonwebtoken')

module.exports = {
  getUsers: (req, res) => {
    userModels.getUsers()
      .then((result) => {
        res.json(result)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  postUser: (req, res) => {
    const salt = MiscHelper.generateSalt(8)
    const passwordHash = MiscHelper.setPassword(req.body.password, salt)
    const data = {
      email: req.body.email,
      fullname: req.body.fullname,
      username: req.body.username,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      role: 2,
      token: 'Test',
      status: 1,
      crateAt: new Date(),
      updateAt: new Date()
    }

    userModels.postUser(data)
      .then((result) => {
        // login(data.email, req.body.password, res)
        return MiscHelper.response(res, data)
      })
      .catch((error) => {
        console.log(error)
        res.json(error)
      })
  },
  getByEmail: (req, res) => {
    const email = req.body.email
    const password = req.body.password
    login(email, password, res)
  },
  logout: (req, res) => {
    const idUser = req.params.idUser
  
    userModels.logout(idUser)
      .then(() => {
        MiscHelper.response(res,'anda sudah logout', 200)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

function login (email, password, res) {
  userModels.getByEmail(email)
    .then((result) => {
      console.log('dsd')
      console.log(result)
      if (result.length > 0) {
        const dataUser = result[0]
        const userPassword = MiscHelper.setPassword(password, dataUser.salt).passwordHash
        if (userPassword === dataUser.password) {
          dataUser.token = jwt.sign({
            userid: dataUser.id
          }, 'KEY', { expiresIn: '1h' })
          delete dataUser.salt
          delete dataUser.password
        //   return res.json(dataUser)
          return MiscHelper.response(res, dataUser)
        } else {
          res.json('Password Worng')
        }
      } else {
        res.json('Email Not Found')
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

  