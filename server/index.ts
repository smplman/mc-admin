import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import cors from 'cors'
import history from 'connect-history-api-fallback'

import editor from './editor'
import mcLogWatch from './mcLogWatch'
import rcon from './rcon'
import sockets from './sockets'

const app: express.Express = express()
const server: http.Server = http.createServer(app)
const port = process.env.PORT || 3000

async function main() {
  app.use(cors())

  editor(app)
  console.log('starting socket server...')
  const socket = sockets(server)
  // sockets(server).then((socket) => {
  //   mcLogWatch(socket)
  // })

  // sockets(server)
  mcLogWatch(socket)
  rcon(app)
  
  // Serve all the files in '/dist' directory
  app.use(express.static('./dist'))
  
  app.use(history({
    logger: console.log.bind(console),
    verbose: true,
    index: 'index.html' 
  }))
  
  app.use(express.static('./dist'))
  
  app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
  });
  
  server.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  })
}

main()