const {
  user
} = require('../../../sequelize/models')
module.exports = function (req, res) {
  const {
    userId
  } = req.params


  user.findOne({
    where: {
      id: userId
    }
  }).then(results => {
    res.send(results)
  }).catch(err => {
    console.log("ERR = " + err)
    res.sendStatus(500)
  })
}
