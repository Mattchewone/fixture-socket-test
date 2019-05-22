import io from 'socket.io-client'
import fixtureSocket from 'can-fixture-socket'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'

const mockServer = new fixtureSocket.Server(io)
const toListener = fixtureSocket.requestHandlerToListener

const socket = io('http://localhost:3030', { transports: ['websocket'] })

const feathersClient = feathers()
  .configure(socketio(socket))

mockServer.on('connection', () => {
  console.log('mockServer::connect', { mockServer })
})

mockServer.on({
  [`messages::find`]: toListener(({ data }, res) => {
    console.log('find...')
    res([])
  }),
  [`messages::get`]: toListener(({ data }, res) => {
    console.log('get...')
    res([])
  }),
  [`messages::create`]: toListener(({ data }, res) => {
    console.log('create...')
    res([])
  }),
  [`messages::update`]: toListener(({ data }, res) => {
    console.log('update...')
    res([])
  }),
  [`messages::delete`]: toListener(({ data }, res) => {
    console.log('delete...')
    res([])
  })
})

socket.on('connect', () => {
  console.log('socket::connect', { socket, feathersClient })
  feathersClient.service('messages').find({ query: {} })
    .then(res => {
      console.log('res', { res })
    })
    .catch(console.error)
})
