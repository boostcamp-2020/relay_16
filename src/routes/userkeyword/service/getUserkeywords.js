const {
  userkeyword
} = require('../../../sequelize/models')
module.exports = function (req, res) {
  const {
    userId
  } = req.params


  userkeyword.findAll({
    where: {
      userId: userId
    }
  }).then(results => {
    res.send(results)
  }).catch(err => {
    console.log("ERR = " + err)
    res.sendStatus(500)
  })
}
