import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = 3000

const httpServer = createServer()
const io = new Server(httpServer, {
  // options
})

io.on('connection', () => {
  // ... add new tcp
})

httpServer.listen(PORT, () => `Server listening on port: ${PORT}`)
