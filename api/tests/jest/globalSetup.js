require('babel-register')       //allows for the import of files that make use of babel syntax like "import"
require('@babel/polyfill/noConflict')

const server = require('../../src/server').default

module.exports = async () => {
    global.httpServer = await server.start({ port: 4000 })
}
