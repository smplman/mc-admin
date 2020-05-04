import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import path from 'path'

const dirPath = path.join(__dirname, '..', 'minecraft')

export default (app: express.Express) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.get('/files', (req: express.Request, res: express.Response) => {
    const file = req.query.file;
    if (file) {
      fs.readFile(path.join(dirPath, <string> file), (err, data) => {
        res.send(data)
      })
    } else {
      fs.readdir(dirPath, (err, items) => {
        res.send(items)
      })
    }
  })

  app.post('/files',(req: express.Request, res: express.Response) => {
    const fileName = req.body.fileName
    const fileData = req.body.fileData

    fs.writeFile(path.join(dirPath, <string> fileName), fileData, (err) => {
      const status = err ? 'error saving file' : 'success'
      res.send(status)
    })
  })
}