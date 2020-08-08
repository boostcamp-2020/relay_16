const filenames = require('../../../modules/filenames')
const serviceNames = filenames(__dirname)

const serviceModule = {}

serviceNames.map(serviceName=>{
    serviceModule[serviceName] =require(`./${serviceName}`)
})

module.exports =serviceModule