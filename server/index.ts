import express from 'express'
import { Rcon } from 'rcon-client'
import config from '../mc-admin.config'
import mcLogWatch from './mcLogWatch'

const history = require('connect-history-api-fallback')
const cors = require('cors')

const app: express.Express = express()
const port = 3000;

app.use(cors())

// console.log(mcLogWatch)

mcLogWatch()

const rcon = new Rcon(config.rcon)

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

app.get('/rcon', async (req: express.Request, res: express.Response) => {
  const command = req.query.command;
  // Send rcon command
  await rcon.connect()
  console.log('Sending RCON Command: ', command)
  const rconRes = await rcon.send(<string> command)
  console.log(rconRes)
  // Send response back
  res.send(rconRes)

  rcon.end()
})

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
})