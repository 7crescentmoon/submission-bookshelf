// const Hapi = require('@hapi/hapi')
// const routes = require('./routes.js')
import Hapi from "@hapi/hapi";
import routes from "./routes.js";

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',

    })

    server.route(routes)

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

init()