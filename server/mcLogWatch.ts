// https://thisdavej.com/how-to-watch-for-files-changes-in-node-js/

import * as path from 'path'
import socketio from 'socket.io'

const Tail = require('tail').Tail
const tail = new Tail(path.join(__dirname, '..', 'minecraft', 'logs', 'latest.log'))
const reStr = /^\[(\d{2}:\d{2}:\d{2})\]\s\[([\w\s]+)\/(\w+)\]:\s(.*)$/gm

export default (socket) => { 
  
  console.log('Listening to latest.log')

  tail.on('line', function(logData) {
    let re = new RegExp(reStr)
    let result = re.exec(logData)
    let data = {}

    if (result.length) {
      data = {
        time: result[1],
        thread: result[2],
        level: result[3],
        message: result[4]
      }
    }
    console.log(data)
    socket.emit('mcLog', data)
  })
  
  tail.on('error', function(error) {
    console.log('ERROR: ', error)
  })
}