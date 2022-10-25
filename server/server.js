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

  socket.on('sendMessage', ({ message, username }) => {
    const newMessage = `${username} says - ${message}`
    logger(`New message: ${newMessage}`)
    io.emit('new message', {
      message: newMessage,
    })
  })

  socket.on('new user', (user) => {
    logger(`New user: ${user.username}`)
    socket.broadcast.emit('new user', `User ${user.username} joined the chat`)
  })
})
