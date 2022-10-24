import { Server } from 'socket.io'
import { logger } from './utils.js'

const PORT = 3000

const io = new Server(PORT)

io.on('connection', (socket) => {
  logger(`User connected`)
  socket.on('disconnect', () => {
    logger(`User disconnected`)
    io.emit('user disconnected')
  })

  socket.on('sendMessage', (message) => {
    logger(`New message: ${message}`)
    io.emit('new message', {
      message,
    })
  })

  socket.on('new user', (user) => {
    logger(`New user: ${user.username}`)
    socket.emit('user created', { username: user.username, userId: socket.id })
    socket.broadcast.emit('new user', `User ${user.username} joined the chat`)
  })
})
