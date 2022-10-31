import { Server } from 'socket.io'
import { logger } from './utils.js'

const PORT = 3000

const io = new Server(PORT)

io.on('connection', (socket) => {
  const users = []

  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      id,
      username: socket.username,
    })
  }

  socket.emit('users', users)

  socket.broadcast.emit('user connected', {
    id: socket.id,
    username: socket.username,
  })

  socket.on('sendMessage', ({ message, username }) => {
    const newMessage = `${username} says - ${message}`
    logger(`New message: ${newMessage}`)
    io.emit('new message', {
      message: newMessage,
    })
  })

  socket.on('disconnect', () => {
    const user = users.find((user) => user.id === socket.id)
    io.emit('user disconnected', user)
  })
})

io.use((socket, next) => {
  const username = socket.handshake.auth.username

  socket.username = username
  next()
})
