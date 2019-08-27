const conn =require('../configs/db')

module.exports = {
    getAllScore: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT score.idscore, user.idUser, user.fullname, score.score FROM score INNER JOIN user ON score.idUser = user.idUser ORDER BY score.score DESC LIMIT 10 OFFSET 0', (err, result) =>{
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getByUser: (idUser) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT score.idscore, user.fullname, user.username, score.score FROM score INNER JOIN user ON score.idUser = user.idUser WHERE score.idUser = ?', idUser, (err, result) => {
                if (!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    addScore: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO score SET ?', data, (err, result) => {
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    updateScore: (idUser, data) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE score SET ? WHERE idUser = ?', [data, idUser], (err, result) => {
                if(!err){
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}