
const {
    user
  } = require('../../../sequelize/models')
 

  module.exports = function (req, res) {
      console.log(req.body)
      console.log(req.header)
    user.create({
      ...req.body,
    }).then(results => {
      res.send(results)
    }).catch(err => {
      console.log("ERR = " + err)
      res.sendStatus(500)
    })
  }
  