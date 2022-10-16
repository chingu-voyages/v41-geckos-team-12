import { Server } from 'socket.io'

const PORT = 3000

const io = new Server(PORT, {
  // options
})

io.on('connection', () => {
  console.log('new connection')
})
