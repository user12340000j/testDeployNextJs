// const express = require('express')
// const next = require('next')



// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()



// app.prepare()
// .then(() => {
// const server = express()



// server.get('*', (req, res) => {
// return handle(req, res)
// })



// server.listen(3000, (err) => {
// if (err) throw err
// console.log('> Ready on http://localhost:3000')
// })
// })
// .catch((ex) => {
// console.error(ex.stack)
// process.exit(1)
// })



const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')



const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()



app.prepare().then(() => {
createServer(async (req, res) => {
try {
// Be sure to pass `true` as the second argument to `url.parse`.
// This tells it to parse the query portion of the URL.
const parsedUrl = parse(req.url, true)
const { pathname, query } = parsedUrl



if (pathname === '/a') {
await app.render(req, res, '/a', query)
} else if (pathname === '/b') {
await app.render(req, res, '/b', query)
} else {
await handle(req, res, parsedUrl)
}
} catch (err) {
console.error('Error occurred handling', req.url, err)
res.statusCode = 500
res.end('internal server error')
}
}).listen(port, (err) => {
if (err) throw err
console.log(`> Ready on http://${hostname}:${port}`)
})
})

















/**
 * This custom express-js server is needed to make next-i18next work
 * as stated in the documentation
 */
const express = require("express");
const next = require("next");
const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();
const courtesy = process.env.USE_COURTESY || "false";
//const generateSitemap = require("./utils/generateSiteMap");

const redirectUrl = [
    '/chi-siamo/servizi',
    '/chi-siamo/solidita-finanziaria',
    '/contatti/factoring',
    '/factoring-digitale',
    '/factoring-digitale/conto-business',
    '/la-nostra-squadra',
    '/redirect-desktop'
]

app.prepare().then(() => {
    const server = express();
    server.disable("x-powered-by");
    if (courtesy == "true") {
        server.use(express.static("service"));
    } else {
        server.get("*", (req, res) => {
            if (redirectUrl.includes(req.url)) {
                res.redirect('/');
            } else {
                return handle(req, res)
            }
        });
        server.post('*', (req, res) => {
            return handle(req, res);
        });
    }
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
    });
    /*generateSitemap();*/
})