import config from '../mc-admin.config'
import express from 'express'
import { Rcon } from 'rcon-client'

const rcon = new Rcon(config.rcon)

export default (app: express.Express) => {
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
}