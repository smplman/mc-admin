
import http from 'http'
import socketio from "socket.io";

export default (server: http.Server) => {
  const io: socketio.Server = socketio(server)

  return io.on('connection', (socket: socketio.Socket) => {
    console.log('a user connected')
    // whenever we receive a 'message' we log it out
    socket.on('message', (message: any) => {
      console.log(message);
    })

    return socket
  })

  // console.log('async method')

  // return new Promise<socketio.Socket>((resolve, reject) => {
  //   // const io: socketio.Server = socketio(server)

  //   console.log('looking for connection')

  //   io.on('connection', (socket: socketio.Socket) => {
  //     console.log('a user connected')
  //     // whenever we receive a 'message' we log it out
  //     socket.on('message', (message: any) => {
  //       console.log(message);
  //     })
  
  //     // return socket
  //     resolve(socket)
  //   })
  // })
}