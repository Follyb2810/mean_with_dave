const logEvent =require('./logEvent');

const EventEmitter = require('events')
class Emitter extends EventEmitter{}

const myEmitter = new Emitter()

myEmitter.on('log',(msg)=>logEvent(msg))

setTimeout(()=>{
    myEmitter.emit('log','log evebt emmited' )
},2000 )