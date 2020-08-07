const filenames = require('../modules/filenames')
const apiPrefix = '/api'
module.exports = function (app) {
    const routes = filenames(__dirname)

    routes.map(route =>{
        app.use(`${apiPrefix}`,require(`./${route}/index.js`))
    })
}