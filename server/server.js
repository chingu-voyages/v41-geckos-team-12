import { Server } from 'socket.io'
import { logger } from './utils.js'

const PORT = 3000

const io = new Server(PORT, { cors: '*' })

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

  socket.on('sendMessage', ({ message }) => {
    logger(`New message: ${message}`)
    io.emit('new message', {
      message,
      users,
      from: socket.id,
    })
  })

  socket.on('privateMessage', ({ message, id }) => {
    socket
      .to(id)
      .emit('new message', { message, from: socket.id, users, isPrivate: true })
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
