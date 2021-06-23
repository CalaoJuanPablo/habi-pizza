const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()
const { v4: uuidv4 } = require('uuid')

const PORT = 3500

server.use(middlewares)

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log('REQ BODY', req.body)
    req.body.createdAt = Date.now()
  }

  next()
})

server.use(router)
server.listen(PORT, () => {
  console.log(`JSON Server is running in ${PORT} port`)
})
