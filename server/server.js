import { Server } from 'socket.io'
import { logger } from './utils.js'

const PORT = 3000

const io = new Server(PORT)

io.on('connection', (socket) => {
  logger('User connected')
  socket.on('disconnect', () => logger('User disconnected'))

  socket.on('frontend-test', () => {
    logger(`frontend test received`)
    io.emit('backend-response', {
      msg: 'Message test success - Open app in second browser to verify',
    })
  })
})
